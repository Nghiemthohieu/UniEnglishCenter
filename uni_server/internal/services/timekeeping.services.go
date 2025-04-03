package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type TimeKeepingService struct {
	TimeKeepingRepo *repo.TimeKeepingRepo
}

func NewTimeKeepingService() *TimeKeepingService {
	return &TimeKeepingService{
		TimeKeepingRepo: repo.NewTimeKeepingRepo(),
	}
}

func (tks *TimeKeepingService) CreateTimeKeeping(request models.TimeKeeping) error {
	return tks.TimeKeepingRepo.CreateTimeKeeping(request)
}

func (tks *TimeKeepingService) UpdateTimeKeeping(request models.TimeKeeping) error {
	return tks.TimeKeepingRepo.UpdateTimeKeeping(request)
}

func (tks *TimeKeepingService) GetAllTimeKeeping(paging util.Paging) ([]models.TimeKeeping, int64, error) {
	return tks.TimeKeepingRepo.GetAllTimeKeepings(paging)
}

func (tks *TimeKeepingService) GetTimeKeepingByID(id uint) (*models.TimeKeeping, error) {
	return tks.TimeKeepingRepo.GetTimeKeepingByID(id)
}

func (tks *TimeKeepingService) DeleteTimeKeeping(id uint) error {
	return tks.TimeKeepingRepo.DeleteTimeKeeping(id)
}
