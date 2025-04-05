package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type PaymentFormService struct {
	PaymentFormRepo *repo.PaymentFormRepo
}

func NewPaymentFormService() *PaymentFormService {
	return &PaymentFormService{
		PaymentFormRepo: repo.NewPaymentFormRepo(),
	}
}

func (pfs *PaymentFormService) CreatePaymentForm(request models.PaymentForm) error {
	return pfs.PaymentFormRepo.CreatePaymentForm(request)
}

func (pfs *PaymentFormService) UpdatePaymentForm(request models.PaymentForm) error {
	return pfs.PaymentFormRepo.UpdatePaymentForm(request)
}

func (pfs *PaymentFormService) GetAllPaymentForms() ([]models.PaymentForm, error) {
	return pfs.PaymentFormRepo.GetAllPaymentForms()
}

func (pfs *PaymentFormService) GetPaymentFormByID(id uint) (*models.PaymentForm, error) {
	return pfs.PaymentFormRepo.GetPaymentFormByID(id)
}

func (pfs *PaymentFormService) DeletePaymentForm(id uint) error {
	return pfs.PaymentFormRepo.DeletePaymentForm(id)
}
