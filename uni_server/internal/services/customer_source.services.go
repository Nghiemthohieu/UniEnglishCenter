package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type CustomerSourceServices struct {
	CustomerSourceRepo *repo.CustomerSourceRepo
}

func NewCustomerSourceService() *CustomerSourceServices {
	return &CustomerSourceServices{
		CustomerSourceRepo: repo.NewCustomerSourceRepo(),
	}
}

func (css *CustomerSourceServices) CreateCustomerSourceService(request models.CustomerSource) error {
	return css.CustomerSourceRepo.CreateCustomerSourceRepo(request)
}

func (css *CustomerSourceServices) UpdateCustomerSourceService(request models.CustomerSource) error {
	return css.CustomerSourceRepo.UpdateCustomerSourceRepo(request)
}

func (css *CustomerSourceServices) GetAllCustomerSourcesService() ([]models.CustomerSource, error) {
	return css.CustomerSourceRepo.GetAllCustomerSourcesRepo()
}

func (css *CustomerSourceServices) GetCustomerSourceByIdService(id uint) (*models.CustomerSource, error) {
	return css.CustomerSourceRepo.GetCustomerSourceByIDRepo(id)
}

func (css *CustomerSourceServices) DeleteCustomerSourceService(id uint) error {
	return css.CustomerSourceRepo.DeleteCustomerSourceRepo(id)
}
