package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
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

func (ps *PositionService) GetAllPositions(paging util.Paging) ([]models.Position, int64, error) {
	return ps.PositionRepo.GetAllPositions(paging)
}

func (ps *PositionService) GetPositionByID(id uint) (*models.Position, error) {
	return ps.PositionRepo.GetPositionByID(id)
}

func (ps *PositionService) DeletePosition(id uint) error {
	return ps.PositionRepo.DeletePosition(id)
}
