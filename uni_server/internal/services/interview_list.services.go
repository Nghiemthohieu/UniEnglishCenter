package services

import (
	"fmt"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type InterviewListService struct {
	InterviewListRepo *repo.InterviewListRepo
	HumanRepo         *repo.HumanRepo
}

func NewInterviewListService() *InterviewListService {
	return &InterviewListService{
		InterviewListRepo: repo.NewInterviewListRepo(),
		HumanRepo:         repo.NewHumanRepo(),
	}
}

func (ils *InterviewListService) CreateInterviewList(request models.InterviewList) error {
	return ils.InterviewListRepo.CreateInterview(request)
}

func (ils *InterviewListService) UpdateInterviewList(request models.InterviewList) error {
	return ils.InterviewListRepo.UpdateInterview(request)
}

func (ils *InterviewListService) GetAllInterviewLists() ([]models.InterviewList, error) {
	return ils.InterviewListRepo.GetAllInterviews()
}

func (ils *InterviewListService) GetInterviewListByID(id uint) (*models.InterviewList, error) {
	return ils.InterviewListRepo.GetInterviewByID(id)
}

func (ils *InterviewListService) GetInterviewByOffice(id uint) ([]models.InterviewList, error) {
	human, _, err := ils.HumanRepo.GetHumanByIDRepo(uint(id))
	if err != nil {
		return nil, err
	}
	return ils.InterviewListRepo.GetInterviewByOffice(uint(human.IDOffice))
}

func (ils *InterviewListService) DeleteInterviewList(id uint) error {
	return ils.InterviewListRepo.DeleteInterview(id)
}

func (ils *InterviewListService) CountInterviewhuman(id int, year int, month int) ([]dto.InterviewCount, error) {
	human, _, err := ils.HumanRepo.GetHumanByIDRepo(uint(id))
	if err != nil {
		return nil, err
	}
	return ils.InterviewListRepo.CountInterviewhuman(human.IDOffice, year, month)
}

func (ils *InterviewListService) CountInterviewResult(id int, year int, month int) ([]dto.CountInterviewResult, error) {
	human, _, err := ils.HumanRepo.GetHumanByIDRepo(uint(id))
	if err != nil {
		return nil, err
	}
	return ils.InterviewListRepo.CountInterviewResult(human.IDOffice, year, month)
}

func (ils *InterviewListService) CountInterviewResultByDate(id int, date util.DateOnly) ([]dto.InterouputDate, error) {
	subIDs, err := GetAllSubordinateIDs(id)
	if err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách cấp dưới: %v", err)
	}
	return ils.InterviewListRepo.CountInterviewResultByDate(subIDs, date)
}
