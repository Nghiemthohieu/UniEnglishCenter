package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type DutyScheduleService struct {
	DutyScheduleRepo *repo.DutyScheduleRepo
}

func NewDutyScheduleService() *DutyScheduleService {
	return &DutyScheduleService{
		DutyScheduleRepo: repo.NewDutyScheduleRepo(),
	}
}

func (dss *DutyScheduleService) CreateDutySchedule(request models.DutySchedule) error {
	return dss.DutyScheduleRepo.CreateDutySchedule(request)
}

func (dss *DutyScheduleService) UpdateDutySchedule(request models.DutySchedule) error {
	return dss.DutyScheduleRepo.UpdateDutySchedule(request)
}

func (dss *DutyScheduleService) GetAllDutySchedules(paging util.Paging) ([]models.DutySchedule, int64, error) {
	return dss.DutyScheduleRepo.GetAllDutySchedules(paging)
}

func (dss *DutyScheduleService) GetDutyScheduleByID(id uint) (*models.DutySchedule, error) {
	return dss.DutyScheduleRepo.GetDutyScheduleByID(id)
}

func (dss *DutyScheduleService) DeleteDutySchedule(id uint) error {
	return dss.DutyScheduleRepo.DeleteDutySchedule(id)
}
