package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type PaymentFormRepo struct{}

func NewPaymentFormRepo() *PaymentFormRepo {
	return &PaymentFormRepo{}
}

// 📌 Tạo mới một hình thức thanh toán
func (repo *PaymentFormRepo) CreatePaymentForm(paymentForm models.PaymentForm) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&paymentForm).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu hình thức thanh toán: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin hình thức thanh toán
func (repo *PaymentFormRepo) UpdatePaymentForm(paymentForm models.PaymentForm) error {
	tx := global.Mdb.Begin()

	var existingPaymentForm models.PaymentForm
	if err := tx.First(&existingPaymentForm, paymentForm.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm hình thức thanh toán: %v", err)
	}

	// Giữ nguyên thời gian tạo
	paymentForm.CreatedAt = existingPaymentForm.CreatedAt
	if err := tx.Save(&paymentForm).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật hình thức thanh toán: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách hình thức thanh toán có phân trang
func (repo *PaymentFormRepo) GetAllPaymentForms() ([]models.PaymentForm, error) {
	var paymentForms []models.PaymentForm

	if err := global.Mdb.Find(&paymentForms).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách hình thức thanh toán: %v", err)
	}
	return paymentForms, nil
}

// 📌 Lấy thông tin chi tiết của một hình thức thanh toán theo ID
func (repo *PaymentFormRepo) GetPaymentFormByID(id uint) (*models.PaymentForm, error) {
	var paymentForm models.PaymentForm
	if err := global.Mdb.First(&paymentForm, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy hình thức thanh toán theo ID: %v", err)
	}
	return &paymentForm, nil
}

// 📌 Xóa một hình thức thanh toán theo ID
func (repo *PaymentFormRepo) DeletePaymentForm(id uint) error {
	tx := global.Mdb.Begin()

	var paymentForm models.PaymentForm
	if err := tx.First(&paymentForm, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm hình thức thanh toán để xóa: %v", err)
	}

	if err := tx.Delete(&paymentForm).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa hình thức thanh toán: %v", err)
	}

	tx.Commit()
	return nil
}
