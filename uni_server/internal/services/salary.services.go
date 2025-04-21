package services

import (
	"fmt"
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type SalaryService struct {
	SalaryRepo *repo.SalaryRepo
}

func NewSalaryService() *SalaryService {
	return &SalaryService{
		SalaryRepo: repo.NewSalaryRepo(),
	}
}

func (s *SalaryService) GetAllSalaries(year int, month int) ([]map[string]interface{}, error) {
	return s.SalaryRepo.GetAllSalaries(year, month)
}

func (s *SalaryService) GetallSalary(id int, year int, month int) ([]models.Salary, error) {
	subIDs, err := GetAllSubordinateIDs(id)
	if err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách cấp dưới: %v", err)
	}
	return s.SalaryRepo.GetAllSalary(subIDs, year, month)
}
