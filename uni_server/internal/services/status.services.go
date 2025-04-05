package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type StatusService struct {
	StatusRepo *repo.StatusRepo
}

func NewStatusService() *StatusService {
	return &StatusService{
		StatusRepo: repo.NewStatusRepo(),
	}
}

func (ss *StatusService) CreateStatus(request models.Status) error {
	return ss.StatusRepo.CreateStatus(request)
}

func (ss *StatusService) UpdateStatus(request models.Status) error {
	return ss.StatusRepo.UpdateStatus(request)
}

func (ss *StatusService) GetAllStatuses() ([]models.Status, error) {
	return ss.StatusRepo.GetAllStatuses()
}

func (ss *StatusService) GetStatusByID(id uint) (*models.Status, error) {
	return ss.StatusRepo.GetStatusByID(id)
}

func (ss *StatusService) DeleteStatus(id uint) error {
	return ss.StatusRepo.DeleteStatus(id)
}
