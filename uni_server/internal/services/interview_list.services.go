package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type InterviewListService struct {
	InterviewListRepo *repo.InterviewListRepo
}

func NewInterviewListService() *InterviewListService {
	return &InterviewListService{
		InterviewListRepo: repo.NewInterviewListRepo(),
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

func (ils *InterviewListService) DeleteInterviewList(id uint) error {
	return ils.InterviewListRepo.DeleteInterview(id)
}
