package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type PotentialCustomerService struct {
	PotentialCustomerRepo *repo.PotentialCustomerListRepo
}

func NewPotentialCustomerService() *PotentialCustomerService {
	return &PotentialCustomerService{
		PotentialCustomerRepo: repo.NewPotentialCustomerListRepo(),
	}
}

func (pcs *PotentialCustomerService) CreatePotentialCustomer(request models.PotentialCustomerList) error {
	return pcs.PotentialCustomerRepo.CreatePotentialCustomer(request)
}

func (pcs *PotentialCustomerService) UpdatePotentialCustomer(request models.PotentialCustomerList) error {
	return pcs.PotentialCustomerRepo.UpdatePotentialCustomer(request)
}

func (pcs *PotentialCustomerService) GetAllPotentialCustomers(paging util.Paging) ([]models.PotentialCustomerList, int64, error) {
	return pcs.PotentialCustomerRepo.GetAllPotentialCustomers(paging)
}

func (pcs *PotentialCustomerService) GetPotentialCustomerByID(id uint) (*models.PotentialCustomerList, error) {
	return pcs.PotentialCustomerRepo.GetPotentialCustomerByID(id)
}

func (pcs *PotentialCustomerService) DeletePotentialCustomer(id uint) error {
	return pcs.PotentialCustomerRepo.DeletePotentialCustomer(id)
}

func (pcs *PotentialCustomerService) GetPotentialCustomerByHumanID(humanID int) ([]models.PotentialCustomerList, error) {
	return pcs.PotentialCustomerRepo.GetPotentialCustomerByHumanID(humanID)
}

