package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type WorkCalendarRepo struct{}

func NewWorkCalendarRepo() *WorkCalendarRepo {
	return &WorkCalendarRepo{}
}

// 📌 Tạo mới một bản ghi lịch làm việc
func (repo *WorkCalendarRepo) CreateWorkCalendar(workCalendar models.WorkCalendar) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&workCalendar).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu lịch làm việc: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật lịch làm việc
func (repo *WorkCalendarRepo) UpdateWorkCalendar(workCalendar models.WorkCalendar) error {
	tx := global.Mdb.Begin()

	var existingWorkCalendar models.WorkCalendar
	if err := tx.First(&existingWorkCalendar, workCalendar.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm lịch làm việc: %v", err)
	}

	// Giữ nguyên thời gian tạo
	workCalendar.CreatedAt = existingWorkCalendar.CreatedAt
	if err := tx.Save(&workCalendar).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật lịch làm việc: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách lịch làm việc có phân trang
func (repo *WorkCalendarRepo) GetAllWorkCalendars() ([]models.WorkCalendar, error) {
	var workCalendars []models.WorkCalendar

	if err := global.Mdb.Preload("Human").Find(&workCalendars).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách lịch làm việc: %v", err)
	}
	return workCalendars, nil
}

// 📌 Lấy thông tin chi tiết của một lịch làm việc theo ID
func (repo *WorkCalendarRepo) GetWorkCalendarByID(id uint) (*models.WorkCalendar, error) {
	var workCalendar models.WorkCalendar
	if err := global.Mdb.Preload("Human").First(&workCalendar, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy lịch làm việc theo ID: %v", err)
	}
	return &workCalendar, nil
}

// 📌 Xóa một bản ghi lịch làm việc theo ID
func (repo *WorkCalendarRepo) DeleteWorkCalendar(id uint) error {
	tx := global.Mdb.Begin()

	var workCalendar models.WorkCalendar
	if err := tx.First(&workCalendar, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm lịch làm việc để xóa: %v", err)
	}

	if err := tx.Delete(&workCalendar).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa lịch làm việc: %v", err)
	}

	tx.Commit()
	return nil
}
