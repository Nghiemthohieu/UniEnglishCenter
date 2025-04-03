package repo

import (
	"errors"
	"fmt"
	"log"
	"uni_server/global"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type HumanRepo struct{}

func NewHumanRepo() *HumanRepo {
	return &HumanRepo{}
}

func (hr *HumanRepo) CreateHumanRepo(human models.Human, humanNICs []models.HumanNIC) (models.Human, []models.HumanNIC, error) {
	// Bắt đầu transaction
	tx := global.Mdb.Begin()

	// Lưu Human vào database
	if err := tx.Create(&human).Error; err != nil {
		tx.Rollback()
		return human, nil, fmt.Errorf("lỗi khi lưu Human: %v", err)
	}

	// Lưu danh sách HumanNIC (dùng batch insert)
	if len(humanNICs) > 0 {
		for i := range humanNICs {
			humanNICs[i].IDHuman = int(human.ID)
		}
		if err := tx.Create(&humanNICs).Error; err != nil {
			tx.Rollback()
			return human, nil, fmt.Errorf("lỗi khi lưu HumanNIC: %v", err)
		}
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		return human, nil, fmt.Errorf("lỗi khi commit transaction: %v", err)
	}

	return human, humanNICs, nil
}

// Lấy một Human theo ID
func (hr *HumanRepo) GetHumanByIDRepo(id uint) (models.Human, []models.HumanNIC, error) {
	var human models.Human
	var humannic []models.HumanNIC

	// Truy vấn Human
	err := global.Mdb.Preload("Position").Preload("Office").Preload("Status").Preload("Team").
		First(&human, id).Error
	if err != nil {
		log.Printf("Lỗi khi truy vấn Human với ID %d: %v", id, err) // ✅ Log lỗi
		return models.Human{}, nil, fmt.Errorf("không tìm thấy Human với ID %d", id)
	}

	// Truy vấn danh sách HumanNIC
	err = global.Mdb.Where("id_human = ?", id).Find(&humannic).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		log.Printf("Lỗi khi truy vấn HumanNIC với ID_Human %d: %v", id, err) // ✅ Log lỗi
		return human, nil, fmt.Errorf("lỗi truy vấn HumanNIC: %v", err)
	}

	return human, humannic, nil
}

// Lấy tất cả Humans
func (hr *HumanRepo) GetAllHumansRepo(paging util.Paging) ([]models.Human, int64, error) {
	var humans []models.Human
	var total int64

	// Đếm tổng số bản ghi
	if err := global.Mdb.Model(&models.Human{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy tổng số Humans: %v", err)
	}

	// Lấy danh sách có phân trang
	offset := (paging.Page - 1) * paging.Limit
	if err := global.Mdb.Preload("Position").Preload("Office").Preload("Status").Preload("Team").Limit(paging.Limit).Offset(offset).Find(&humans).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy danh sách Humans: %v", err)
	}

	return humans, total, nil
}

// Cập nhật thông tin Human
func (hr *HumanRepo) UpdateHumanRepo(human models.Human, humannic []models.HumanNIC) error {
	// Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
	tx := global.Mdb.Begin()

	// Lấy dữ liệu hiện tại của Human để giữ nguyên created_at
	var existingHuman models.Human
	if err := tx.First(&existingHuman, human.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm Human: %v", err)
	}

	// Cập nhật thông tin Human, giữ nguyên created_at
	human.CreatedAt = existingHuman.CreatedAt
	if err := tx.Save(&human).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật Human: %v", err)
	}

	// Xóa HumanNIC cũ (nếu cần cập nhật danh sách mới)
	if err := tx.Where("id_human = ?", human.ID).Delete(&models.HumanNIC{}).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa HumanNIC cũ: %v", err)
	}

	// Thêm danh sách HumanNIC mới
	for i := range humannic {
		humannic[i].IDHuman = int(human.ID) // Gán IDHuman từ Human
	}
	if len(humannic) > 0 {
		if err := tx.Create(&humannic).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi cập nhật HumanNIC: %v", err)
		}
	}

	tx.Commit()
	return nil
}

// Xóa một Human theo ID
func (hr *HumanRepo) DeleteHumanRepo(id int) error {
	if err := global.Mdb.Delete(&models.Human{}, id).Error; err != nil {
		return fmt.Errorf("lỗi khi xóa Human: %v", err)
	}
	return nil
}
