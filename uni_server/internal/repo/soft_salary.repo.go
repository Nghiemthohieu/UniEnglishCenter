package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type SoftSalaryRepo struct{}

func NewSoftSalaryRepo() *SoftSalaryRepo {
	return &SoftSalaryRepo{}
}

// 📌 Tạo mới một bảng lương mềm
func (repo *SoftSalaryRepo) CreateSoftSalary(salary models.SoftSalary) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&salary).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu bảng lương mềm: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật bảng lương mềm
func (repo *SoftSalaryRepo) UpdateSoftSalary(salary models.SoftSalary) error {
	tx := global.Mdb.Begin()

	var existingSalary models.SoftSalary
	if err := tx.First(&existingSalary, salary.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm bảng lương mềm: %v", err)
	}

	// Giữ nguyên thời gian tạo
	salary.CreatedAt = existingSalary.CreatedAt
	if err := tx.Save(&salary).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật bảng lương mềm: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách bảng lương mềm có phân trang
func (repo *SoftSalaryRepo) GetAllSoftSalaries() ([]models.SoftSalary, error) {
	var salaries []models.SoftSalary
	if err := global.Mdb.Preload("Position").Find(&salaries).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách bảng lương mềm: %v", err)
	}
	return salaries, nil
}

// 📌 Lấy thông tin chi tiết của một bảng lương mềm theo ID
func (repo *SoftSalaryRepo) GetSoftSalaryByID(id uint) (*models.SoftSalary, error) {
	var salary models.SoftSalary
	if err := global.Mdb.Preload("Position").First(&salary, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy bảng lương mềm theo ID: %v", err)
	}
	return &salary, nil
}

// 📌 Xóa một bảng lương mềm theo ID
func (repo *SoftSalaryRepo) DeleteSoftSalary(id uint) error {
	tx := global.Mdb.Begin()

	var salary models.SoftSalary
	if err := tx.First(&salary, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm bảng lương mềm để xóa: %v", err)
	}

	if err := tx.Delete(&salary).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa bảng lương mềm: %v", err)
	}

	tx.Commit()
	return nil
}
