package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type SalaryRepo struct{}

func NewSalaryRepo() *SalaryRepo {
	return &SalaryRepo{}
}

func (csr *SalaryRepo) CalculateSalarySoft(idPosition uint, ds float64) (float64, error) {
	var rule models.BaseSalary
	err := global.Mdb.Where("id_position = ?", idPosition).First(&rule).Error
	if err != nil {
		return 0, fmt.Errorf("không tìm thấy quy tắc lương cho vị trí %d", idPosition)
	}
	var salary float64
	if ds <= float64(rule.Target1) {
		salary = ds * float64(float64(rule.CarePart1)/100.0)
	} else if ds <= float64(rule.Target2) {
		salary = ds * float64(float64(rule.CarePart2)/100.0)
	} else {
		salary = ds * float64(float64(rule.CarePart3)/100.0)
	}
	return salary, nil
}

func (csr *SalaryRepo) CalculateSalaryTeam(idPosition uint, ds float64) (float64, error) {
	var rule models.BaseSalary
	err := global.Mdb.Where("id_position = ?", idPosition).First(&rule).Error
	if err != nil {
		return 0, fmt.Errorf("không tìm thấy quy tắc lương cho vị trí %d", idPosition)
	}
	var salary float64
	if ds <= float64(rule.Target1) {
		salary = ds * float64(float64(rule.CarePart1)/100.0)
	} else if ds <= float64(rule.Target2) {
		salary = ds * float64(float64(rule.CarePart2)/100.0)
	} else {
		salary = ds * float64(float64(rule.CarePart3)/100.0)
	}
	return salary, nil
}

func (csr *SalaryRepo) GetAllSalaries(year int, month int) ([]map[string]interface{}, error) {
	var employees []models.Human
	err := global.Mdb.Find(&employees).Error
	if err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách nhân viên: %v", err)
	}

	salaryResults := []map[string]interface{}{}

	for _, emp := range employees {
		TotalSalarySoft, err := NewDSTeamRepo().GetTotalSalesByTeam(int(emp.ID), year, month)
		if err != nil {
			return nil, err
		}

		salarysoft, err := csr.CalculateSalarySoft(uint(emp.IDPosition), float64(TotalSalarySoft))
		if err != nil {
			return nil, err
		}

		TotalSalaryTeam, err := NewDSTeamRepo().GetSalesByIdEmployee(int(emp.ID), year, month)
		if err != nil {
			return nil, err
		}

		salaryTeam, err := csr.CalculateSalaryTeam(uint(emp.IDPosition), float64(TotalSalaryTeam.TotalSales))
		if err != nil {
			return nil, err
		}

		totalSalary := salarysoft + salaryTeam

		// 🧠 Ghi vào DB
		salaryRecord := models.Salary{
			IDHuman:             int(emp.ID),
			IDPosition:          emp.IDPosition,
			PersonalSales:       int64(TotalSalarySoft),
			TeamSales:           int64(TotalSalaryTeam.TotalSales),
			PersonalSalesSalary: int64(salarysoft),
			TeamSalesSalary:     int64(salaryTeam),
			TotalSalary:         int64(totalSalary),
			Month:               int64(month),
			Year:                int64(year),
		}
		if err := global.Mdb.Create(&salaryRecord).Error; err != nil {
			return nil, fmt.Errorf("lỗi khi lưu salary vào DB: %v", err)
		}

		// 📦 Thêm vào danh sách trả về (nếu bạn vẫn cần trả ra JSON chẳng hạn)
		salaryResults = append(salaryResults, map[string]interface{}{
			"id":                    emp.ID,
			"position_id":           emp.IDPosition,
			"personal_sales":        TotalSalarySoft,
			"team_sales":            TotalSalaryTeam.TotalSales,
			"personal_sales_salary": salarysoft,
			"team_sales_salary":     salaryTeam,
			"total_salary":          totalSalary,
		})
	}

	return salaryResults, nil
}
func (csr *SalaryRepo) GetAllSalary(ids []int, year int, month int) ([]models.Salary, error) {
	var req []models.Salary

	err := global.Mdb.Preload("Human").Preload("Position").Table("go_db_salary").
		Where("id_human IN ? AND month = ? AND year = ?", ids, month, year).
		Find(&req).Error

	if err != nil {
		return nil, fmt.Errorf("lỗi khi truy vấn lương tháng %d/%d: %v", month, year, err)
	}

	return req, nil
}
