package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
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
func (repo *PaymentFormRepo) GetAllPaymentForms(paging util.Paging) ([]models.PaymentForm, int64, error) {
	var paymentForms []models.PaymentForm
	var total int64

	// Lấy tổng số bản ghi
	if err := global.Mdb.Model(&models.PaymentForm{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy tổng số hình thức thanh toán: %v", err)
	}

	offset := (paging.Page - 1) * paging.Limit
	if err := global.Mdb.Limit(paging.Limit).Offset(offset).Find(&paymentForms).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy danh sách hình thức thanh toán: %v", err)
	}
	return paymentForms, total, nil
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
