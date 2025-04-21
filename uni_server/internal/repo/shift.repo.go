package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
)

type ShiftRepo struct{}

func NewShiftRepo() *ShiftRepo {
	return &ShiftRepo{}
}

// 📌 Tạo mới một ca làm việc
func (repo *ShiftRepo) CreateShift(shift models.Shift) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&shift).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu ca làm việc: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin ca làm việc
func (repo *ShiftRepo) UpdateShift(shift models.Shift) error {
	tx := global.Mdb.Begin()

	var existingShift models.Shift
	if err := tx.First(&existingShift, shift.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm ca làm việc: %v", err)
	}

	// Giữ nguyên thời gian tạo
	shift.CreatedAt = existingShift.CreatedAt
	if err := tx.Save(&shift).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật ca làm việc: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách ca làm việc có phân trang
func (repo *ShiftRepo) GetAllShifts() ([]dto.Shift, error) {
	var shifts []models.Shift

	if err := global.Mdb.Find(&shifts).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách ca làm việc: %v", err)
	}

	var result []dto.Shift
	for _, s := range shifts {
		result = append(result, dto.Shift{
			ID:        int(s.ID),
			Shift:     s.Shift,
			TimeStart: util.NewTimeOnlyFromTime(s.TimeStart),
			TimeOut:   util.NewTimeOnlyFromTime(s.TimeOut),
		})
	}

	return result, nil
}

// 📌 Lấy thông tin chi tiết của một ca làm việc theo ID
func (repo *ShiftRepo) GetShiftByID(id uint) (*dto.Shift, error) {
	var shift models.Shift
	if err := global.Mdb.First(&shift, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy ca làm việc theo ID: %v", err)
	}

	// Gán sang DTO
	result := &dto.Shift{
		ID:        int(shift.ID),
		Shift:     shift.Shift,
		TimeStart: util.NewTimeOnlyFromTime(shift.TimeStart),
		TimeOut:   util.NewTimeOnlyFromTime(shift.TimeOut),
	}

	return result, nil
}

// 📌 Xóa một ca làm việc theo ID
func (repo *ShiftRepo) DeleteShift(id uint) error {
	tx := global.Mdb.Begin()

	var shift models.Shift
	if err := tx.First(&shift, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm ca làm việc để xóa: %v", err)
	}

	if err := tx.Delete(&shift).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa ca làm việc: %v", err)
	}

	tx.Commit()
	return nil
}
