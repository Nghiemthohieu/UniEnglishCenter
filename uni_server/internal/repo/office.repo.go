package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type OfficeRepo struct{}

func NewOfficeRepo() *OfficeRepo {
	return &OfficeRepo{}
}

// 📌 Tạo mới một văn phòng
func (repo *OfficeRepo) CreateOffice(office models.Office) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&office).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu văn phòng: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin văn phòng
func (repo *OfficeRepo) UpdateOffice(office models.Office) error {
	tx := global.Mdb.Begin()

	var existingOffice models.Office
	if err := tx.First(&existingOffice, office.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm văn phòng: %v", err)
	}

	// Giữ nguyên thời gian tạo
	office.CreatedAt = existingOffice.CreatedAt
	if err := tx.Save(&office).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật văn phòng: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách văn phòng có phân trang
func (repo *OfficeRepo) GetAllOffices() ([]models.Office, error) {
	var offices []models.Office
	if err := global.Mdb.Find(&offices).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách văn phòng: %v", err)
	}
	return offices, nil
}

// 📌 Lấy thông tin chi tiết của một văn phòng theo ID
func (repo *OfficeRepo) GetOfficeByID(id uint) (*models.Office, error) {
	var office models.Office
	if err := global.Mdb.First(&office, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy văn phòng theo ID: %v", err)
	}
	return &office, nil
}

// 📌 Xóa một văn phòng theo ID
func (repo *OfficeRepo) DeleteOffice(id uint) error {
	tx := global.Mdb.Begin()

	var office models.Office
	if err := tx.First(&office, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm văn phòng để xóa: %v", err)
	}

	if err := tx.Delete(&office).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa văn phòng: %v", err)
	}

	tx.Commit()
	return nil
}
