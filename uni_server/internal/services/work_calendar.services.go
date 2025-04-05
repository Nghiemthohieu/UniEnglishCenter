package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type WorkCalendarService struct {
	WorkCalendarRepo *repo.WorkCalendarRepo
}

func NewWorkCalendarService() *WorkCalendarService {
	return &WorkCalendarService{
		WorkCalendarRepo: repo.NewWorkCalendarRepo(),
	}
}

func (wcs *WorkCalendarService) CreateWorkCalendar(request models.WorkCalendar) error {
	return wcs.WorkCalendarRepo.CreateWorkCalendar(request)
}

func (wcs *WorkCalendarService) UpdateWorkCalendar(request models.WorkCalendar) error {
	return wcs.WorkCalendarRepo.UpdateWorkCalendar(request)
}

func (wcs *WorkCalendarService) GetAllWorkCalendars() ([]models.WorkCalendar, error) {
	return wcs.WorkCalendarRepo.GetAllWorkCalendars()
}

func (wcs *WorkCalendarService) GetWorkCalendarByID(id uint) (*models.WorkCalendar, error) {
	return wcs.WorkCalendarRepo.GetWorkCalendarByID(id)
}

func (wcs *WorkCalendarService) DeleteWorkCalendar(id uint) error {
	return wcs.WorkCalendarRepo.DeleteWorkCalendar(id)
}
