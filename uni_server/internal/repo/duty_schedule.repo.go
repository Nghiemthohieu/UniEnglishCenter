package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
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

func (dsr *DutyScheduleRepo) GetAllDutySchedules() ([]models.DutySchedule, error) {
	var schedules []models.DutySchedule
	if err := global.Mdb.Preload("Human").Preload("Shift").Find(&schedules).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách lịch trực: %v", err)
	}
	return schedules, nil
}

func (dsr *DutyScheduleRepo) GetDutyScheduleByID(id uint) (*models.DutySchedule, error) {
	var schedule models.DutySchedule
	if err := global.Mdb.Preload("Human").First(&schedule, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy lịch trực theo ID: %v", err)
	}
	return &schedule, nil
}

func (dsr *DutyScheduleRepo) GetDutyScheduleByHuman(id uint) ([]models.DutySchedule, error) {
	var schedule []models.DutySchedule
	err := global.Mdb.
		Preload("Human").
		Preload("Shift").
		Where("id_human = ?", id).
		Find(&schedule).Error

	if err != nil {
		return nil, fmt.Errorf("lỗi khi lấy lịch trực theo ID nhân viên: %v", err)
	}
	return schedule, nil
}

func (dsr *DutyScheduleRepo) GetDutyScheduleByOffice(officeID int) ([]models.DutySchedule, error) {
	var schedules []models.DutySchedule

	err := global.Mdb.
		Debug().
		Joins("JOIN go_db_human ON go_db_human.id = go_db_duty_schedule.id_human").
		Where("go_db_human.id_office = ?", officeID).
		Preload("Human").
		Preload("Shift").
		Find(&schedules).Error

	if err != nil {
		return nil, fmt.Errorf("lỗi khi lấy lịch trực theo office: %v", err)
	}

	return schedules, nil
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
