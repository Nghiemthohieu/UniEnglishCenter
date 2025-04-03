package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type BaseSalaryServices struct {
	BaseSalaryRepo *repo.BaseSalaryRepo
}

func NewBaseSalaryService() *BaseSalaryServices {
	return &BaseSalaryServices{
		BaseSalaryRepo: repo.NewBaseSalaryRepo(),
	}
}

func (bss *BaseSalaryServices) CreateBaseSalaryService(request models.BaseSalary) error {
	return bss.BaseSalaryRepo.CreateBaseSalaryRepo(request)
}

func (bss *BaseSalaryServices) UpdateBaseSalaryService(request models.BaseSalary) error {
	return bss.BaseSalaryRepo.UpdateBaseSalaryRepo(request)
}

func (bss *BaseSalaryServices) GetALlBaseSalaryService(paging util.Paging) ([]models.BaseSalary, int64, error) {
	return bss.BaseSalaryRepo.GetAllBaseSalariesRepo(paging)
}

func (bss *BaseSalaryServices) GetBaseSalaryByIdService(id uint) (*models.BaseSalary, error) {
	return bss.BaseSalaryRepo.GetBaseSalaryByIDRepo(id)
}

func (bss *BaseSalaryServices) DeleteBaseSalaryService(id uint) error {
	return bss.BaseSalaryRepo.DeleteBaseSalaryRepo(id)
}
