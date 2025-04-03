package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
)

type DutyScheduleRepo struct{}

func NewDutyScheduleRepo() *DutyScheduleRepo {
	return &DutyScheduleRepo{}
}

func (dsr *DutyScheduleRepo) CreateDutySchedule(schedule models.DutySchedule) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&schedule).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu lịch trực: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

func (dsr *DutyScheduleRepo) UpdateDutySchedule(schedule models.DutySchedule) error {
	tx := global.Mdb.Begin()

	var existingSchedule models.DutySchedule
	if err := tx.First(&existingSchedule, schedule.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm lịch trực: %v", err)
	}

	schedule.CreatedAt = existingSchedule.CreatedAt
	if err := tx.Save(&schedule).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật lịch trực: %v", err)
	}
	tx.Commit()
	return nil
}

func (dsr *DutyScheduleRepo) GetAllDutySchedules(paging util.Paging) ([]models.DutySchedule, int64, error) {
	var schedules []models.DutySchedule
	var total int64

	if err := global.Mdb.Model(&models.DutySchedule{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy tổng số lịch trực: %v", err)
	}
	offset := (paging.Page - 1) * paging.Limit
	if err := global.Mdb.Preload("Human").Limit(paging.Limit).Offset(offset).Find(&schedules).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy danh sách lịch trực: %v", err)
	}
	return schedules, total, nil
}

func (dsr *DutyScheduleRepo) GetDutyScheduleByID(id uint) (*models.DutySchedule, error) {
	var schedule models.DutySchedule
	if err := global.Mdb.Preload("Human").First(&schedule, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy lịch trực theo ID: %v", err)
	}
	return &schedule, nil
}

func (dsr *DutyScheduleRepo) DeleteDutySchedule(id uint) error {
	tx := global.Mdb.Begin()

	var schedule models.DutySchedule
	if err := tx.First(&schedule, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm lịch trực để xóa: %v", err)
	}

	if err := tx.Delete(&schedule).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa lịch trực: %v", err)
	}

	tx.Commit()
	return nil
}
