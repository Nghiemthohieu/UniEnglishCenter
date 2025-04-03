package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type OfficeService struct {
	OfficeRepo *repo.OfficeRepo
}

func NewOfficeService() *OfficeService {
	return &OfficeService{
		OfficeRepo: repo.NewOfficeRepo(),
	}
}

func (os *OfficeService) CreateOffice(request models.Office) error {
	return os.OfficeRepo.CreateOffice(request)
}

func (os *OfficeService) UpdateOffice(request models.Office) error {
	return os.OfficeRepo.UpdateOffice(request)
}

func (os *OfficeService) GetAllOffices(paging util.Paging) ([]models.Office, int64, error) {
	return os.OfficeRepo.GetAllOffices(paging)
}

func (os *OfficeService) GetOfficeByID(id uint) (*models.Office, error) {
	return os.OfficeRepo.GetOfficeByID(id)
}

func (os *OfficeService) DeleteOffice(id uint) error {
	return os.OfficeRepo.DeleteOffice(id)
}
