package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type PositionService struct {
	PositionRepo *repo.PositionRepo
}

func NewPositionService() *PositionService {
	return &PositionService{
		PositionRepo: repo.NewPositionRepo(),
	}
}

func (ps *PositionService) CreatePosition(request models.Position) error {
	return ps.PositionRepo.CreatePosition(request)
}

func (ps *PositionService) UpdatePosition(request models.Position) error {
	return ps.PositionRepo.UpdatePosition(request)
}

func (ps *PositionService) GetAllPositions() ([]models.Position, error) {
	return ps.PositionRepo.GetAllPositions()
}

func (ps *PositionService) GetPositionByID(id uint) (*models.Position, error) {
	return ps.PositionRepo.GetPositionByID(id)
}

func (ps *PositionService) DeletePosition(id uint) error {
	return ps.PositionRepo.DeletePosition(id)
}
