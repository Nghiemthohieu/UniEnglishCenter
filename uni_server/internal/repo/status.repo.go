package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type StatusRepo struct{}

func NewStatusRepo() *StatusRepo {
	return &StatusRepo{}
}

// 📌 Tạo mới một trạng thái
func (repo *StatusRepo) CreateStatus(status models.Status) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&status).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu trạng thái: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật trạng thái
func (repo *StatusRepo) UpdateStatus(status models.Status) error {
	tx := global.Mdb.Begin()

	var existingStatus models.Status
	if err := tx.First(&existingStatus, status.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm trạng thái: %v", err)
	}

	// Giữ nguyên thời gian tạo
	status.CreatedAt = existingStatus.CreatedAt
	if err := tx.Save(&status).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật trạng thái: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách trạng thái có phân trang
func (repo *StatusRepo) GetAllStatuses() ([]models.Status, error) {
	var statuses []models.Status
	if err := global.Mdb.Find(&statuses).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách trạng thái: %v", err)
	}
	return statuses, nil
}

// 📌 Lấy thông tin chi tiết của một trạng thái theo ID
func (repo *StatusRepo) GetStatusByID(id uint) (*models.Status, error) {
	var status models.Status
	if err := global.Mdb.First(&status, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy trạng thái theo ID: %v", err)
	}
	return &status, nil
}

// 📌 Xóa một trạng thái theo ID
func (repo *StatusRepo) DeleteStatus(id uint) error {
	tx := global.Mdb.Begin()

	var status models.Status
	if err := tx.First(&status, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm trạng thái để xóa: %v", err)
	}

	if err := tx.Delete(&status).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa trạng thái: %v", err)
	}

	tx.Commit()
	return nil
}
