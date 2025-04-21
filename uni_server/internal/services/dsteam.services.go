package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type DSTeamService struct {
	DSTeamRepo *repo.DSTeamRepo
}

func NewDSTeamService() *DSTeamService {
	return &DSTeamService{
		DSTeamRepo: repo.NewDSTeamRepo(),
	}
}

func (s *DSTeamService) GetTotalSalesByTeam(humanID int, year int, month int) (int, error) {
	return s.DSTeamRepo.GetTotalSalesByTeam(humanID, year, month)
}

func (s *DSTeamService) GetSalesByEmployee(year int, month int) ([]models.SalesData, error) {
	return s.DSTeamRepo.GetSalesByEmployee(year, month)
}

func (s *DSTeamService) GetSalesByEmployeeID(id int, year int, month int) (models.SalesData, error) {
	return s.DSTeamRepo.GetSalesByEmployeeID(id, year, month)
}
