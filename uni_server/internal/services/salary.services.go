package services

import "uni_server/internal/repo"

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