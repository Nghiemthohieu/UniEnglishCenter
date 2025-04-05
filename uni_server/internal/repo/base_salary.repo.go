package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type BaseSalaryRepo struct{}

func NewBaseSalaryRepo() *BaseSalaryRepo {
	return &BaseSalaryRepo{}
}

func (bsr *BaseSalaryRepo) CreateBaseSalaryRepo(baseSalary models.BaseSalary) error {
	tx := global.Mdb.Begin()

	if err := global.Mdb.Create(&baseSalary).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu base salary: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

func (bsr *BaseSalaryRepo) UpdateBaseSalaryRepo(baseSalary models.BaseSalary) error {
	tx := global.Mdb.Begin()

	// Kiểm tra xem bản ghi có tồn tại không
	var existingBaseSalary models.BaseSalary
	if err := tx.First(&existingBaseSalary, baseSalary.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm base salary: %v", err)
	}

	baseSalary.CreatedAt = existingBaseSalary.CreatedAt
	// Cập nhật thông tin
	if err := tx.Save(&baseSalary).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật base salary: %v", err)
	}

	tx.Commit()
	return nil
}

func (bsr *BaseSalaryRepo) GetAllBaseSalariesRepo() ([]models.BaseSalary, error) {
	var baseSalaries []models.BaseSalary
	if err := global.Mdb.Preload("Position").Find(&baseSalaries).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách base salary: %v", err)
	}
	return baseSalaries, nil
}

func (bsr *BaseSalaryRepo) GetBaseSalaryByIDRepo(id uint) (*models.BaseSalary, error) {
	var baseSalary models.BaseSalary
	if err := global.Mdb.Preload("Position").First(&baseSalary, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy base salary theo ID: %v", err)
	}
	return &baseSalary, nil
}

func (bsr *BaseSalaryRepo) DeleteBaseSalaryRepo(id uint) error {
	tx := global.Mdb.Begin()

	// Kiểm tra xem bản ghi có tồn tại không
	var baseSalary models.BaseSalary
	if err := tx.First(&baseSalary, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm base salary để xóa: %v", err)
	}

	// Xóa bản ghi
	if err := tx.Delete(&baseSalary).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa base salary: %v", err)
	}

	tx.Commit()
	return nil
}
