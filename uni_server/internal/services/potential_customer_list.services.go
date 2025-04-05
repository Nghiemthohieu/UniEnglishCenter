package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
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

func (pcs *PotentialCustomerService) GetAllPotentialCustomers() ([]models.PotentialCustomerList, error) {
	return pcs.PotentialCustomerRepo.GetAllPotentialCustomers()
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
