package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type ShiftService struct {
	ShiftRepo *repo.ShiftRepo
}

func NewShiftService() *ShiftService {
	return &ShiftService{
		ShiftRepo: repo.NewShiftRepo(),
	}
}

func (ss *ShiftService) CreateShift(request models.Shift) error {
	return ss.ShiftRepo.CreateShift(request)
}

func (ss *ShiftService) UpdateShift(request models.Shift) error {
	return ss.ShiftRepo.UpdateShift(request)
}

func (ss *ShiftService) GetAllShifts(paging util.Paging) ([]models.Shift,int64 , error) {
	return ss.ShiftRepo.GetAllShifts(paging)
}

func (ss *ShiftService) GetShiftByID(id uint) (*models.Shift, error) {
	return ss.ShiftRepo.GetShiftByID(id)
}

func (ss *ShiftService) DeleteShift(id uint) error {
	return ss.ShiftRepo.DeleteShift(id)
}