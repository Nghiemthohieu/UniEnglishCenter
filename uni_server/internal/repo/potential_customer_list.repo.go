package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type PotentialCustomerListRepo struct{}

func NewPotentialCustomerListRepo() *PotentialCustomerListRepo {
	return &PotentialCustomerListRepo{}
}

// 📌 Tạo mới một khách hàng tiềm năng
func (repo *PotentialCustomerListRepo) CreatePotentialCustomer(potentialCustomer models.PotentialCustomerList) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&potentialCustomer).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu khách hàng tiềm năng: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin khách hàng tiềm năng
func (repo *PotentialCustomerListRepo) UpdatePotentialCustomer(potentialCustomer models.PotentialCustomerList) error {
	tx := global.Mdb.Begin()

	var existingCustomer models.PotentialCustomerList
	if err := tx.First(&existingCustomer, potentialCustomer.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm khách hàng tiềm năng: %v", err)
	}

	// Giữ nguyên thời gian tạo
	potentialCustomer.CreatedAt = existingCustomer.CreatedAt
	if err := tx.Save(&potentialCustomer).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật khách hàng tiềm năng: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách khách hàng tiềm năng có phân trang
func (repo *PotentialCustomerListRepo) GetAllPotentialCustomers() ([]models.PotentialCustomerList, error) {
	var customers []models.PotentialCustomerList
	if err := global.Mdb.Preload("Human").Find(&customers).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách khách hàng tiềm năng: %v", err)
	}
	return customers, nil
}

// 📌 Lấy thông tin chi tiết của một khách hàng tiềm năng theo ID
func (repo *PotentialCustomerListRepo) GetPotentialCustomerByID(id uint) (*models.PotentialCustomerList, error) {
	var customer models.PotentialCustomerList
	if err := global.Mdb.Preload("Human").First(&customer, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy thông tin khách hàng tiềm năng theo ID: %v", err)
	}
	return &customer, nil
}

// 📌 Xóa một khách hàng tiềm năng theo ID
func (repo *PotentialCustomerListRepo) DeletePotentialCustomer(id uint) error {
	tx := global.Mdb.Begin()

	var customer models.PotentialCustomerList
	if err := tx.First(&customer, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm khách hàng tiềm năng để xóa: %v", err)
	}

	if err := tx.Delete(&customer).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa khách hàng tiềm năng: %v", err)
	}

	tx.Commit()
	return nil
}

func (repo *PotentialCustomerListRepo) GetPotentialCustomerByHumanID(humanID int) ([]models.PotentialCustomerList, error) {
	var customers []models.PotentialCustomerList
	if err := global.Mdb.Preload("Human").Where("id_human = ?", humanID).Find(&customers).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy thông tin khách hàng tiềm năng theo IDHuman: %v", err)
	}
	return customers, nil
}
