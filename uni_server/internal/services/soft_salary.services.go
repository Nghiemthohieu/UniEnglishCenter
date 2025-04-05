package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type SoftSalaryService struct {
	SoftSalaryRepo *repo.SoftSalaryRepo
}

func NewSoftSalaryService() *SoftSalaryService {
	return &SoftSalaryService{
		SoftSalaryRepo: repo.NewSoftSalaryRepo(),
	}
}

func (sss *SoftSalaryService) CreateSoftSalary(request models.SoftSalary) error {
	return sss.SoftSalaryRepo.CreateSoftSalary(request)
}

func (sss *SoftSalaryService) UpdateSoftSalary(request models.SoftSalary) error {
	return sss.SoftSalaryRepo.UpdateSoftSalary(request)
}

func (sss *SoftSalaryService) GetAllSoftSalaries() ([]models.SoftSalary, error) {
	return sss.SoftSalaryRepo.GetAllSoftSalaries()
}

func (sss *SoftSalaryService) GetSoftSalaryByID(id uint) (*models.SoftSalary, error) {
	return sss.SoftSalaryRepo.GetSoftSalaryByID(id)
}

func (sss *SoftSalaryService) DeleteSoftSalary(id uint) error {
	return sss.SoftSalaryRepo.DeleteSoftSalary(id)
}
