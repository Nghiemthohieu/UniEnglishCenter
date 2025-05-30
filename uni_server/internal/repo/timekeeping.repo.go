package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type TimeKeepingRepo struct{}

func NewTimeKeepingRepo() *TimeKeepingRepo {
	return &TimeKeepingRepo{}
}

// 📌 Tạo mới một bản ghi chấm công
func (repo *TimeKeepingRepo) CreateTimeKeeping(timeKeeping models.TimeKeeping) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&timeKeeping).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu chấm công: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin chấm công
func (repo *TimeKeepingRepo) UpdateTimeKeeping(timeKeeping models.TimeKeeping) error {
	tx := global.Mdb.Begin()

	var existingTimeKeeping models.TimeKeeping
	if err := tx.First(&existingTimeKeeping, timeKeeping.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm thông tin chấm công: %v", err)
	}

	// Giữ nguyên thời gian tạo
	timeKeeping.CreatedAt = existingTimeKeeping.CreatedAt
	if err := tx.Save(&timeKeeping).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật chấm công: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách chấm công có phân trang
func (repo *TimeKeepingRepo) GetAllTimeKeepings() ([]models.TimeKeeping, error) {
	var timeKeepings []models.TimeKeeping

	if err := global.Mdb.Preload("Human").Preload("Position").Find(&timeKeepings).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách chấm công: %v", err)
	}
	return timeKeepings, nil
}

// 📌 Lấy thông tin chi tiết của một bản ghi chấm công theo ID
func (repo *TimeKeepingRepo) GetTimeKeepingByID(id uint) (*models.TimeKeeping, error) {
	var timeKeeping models.TimeKeeping
	if err := global.Mdb.Preload("Human").Preload("Position").First(&timeKeeping, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy thông tin chấm công theo ID: %v", err)
	}
	return &timeKeeping, nil
}

// 📌 Xóa một bản ghi chấm công theo ID
func (repo *TimeKeepingRepo) DeleteTimeKeeping(id uint) error {
	tx := global.Mdb.Begin()

	var timeKeeping models.TimeKeeping
	if err := tx.First(&timeKeeping, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm thông tin chấm công để xóa: %v", err)
	}

	if err := tx.Delete(&timeKeeping).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa thông tin chấm công: %v", err)
	}

	tx.Commit()
	return nil
}

func (repo *TimeKeepingRepo) CreateManyTimeKeeping(list []models.TimeKeeping) error {
	tx := global.Mdb.Begin()
	for _, item := range list {
		if err := tx.Create(&item).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi lưu dòng chấm công: %v", err)
		}
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}
