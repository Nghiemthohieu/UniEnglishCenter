package services

import (
	"fmt"
	"time"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type DutyScheduleService struct {
	DutyScheduleRepo *repo.DutyScheduleRepo
	HumanRepo        *repo.HumanRepo
}

func NewDutyScheduleService() *DutyScheduleService {
	return &DutyScheduleService{
		DutyScheduleRepo: repo.NewDutyScheduleRepo(),
		HumanRepo:        repo.NewHumanRepo(),
	}
}

func (dss *DutyScheduleService) CreateDutySchedule(request models.DutySchedule) error {
	return dss.DutyScheduleRepo.CreateDutySchedule(request)
}

func (dss *DutyScheduleService) UpdateDutySchedule(request models.DutySchedule) error {
	return dss.DutyScheduleRepo.UpdateDutySchedule(request)
}

func (dss *DutyScheduleService) GetAllDutySchedules() ([]models.DutySchedule, error) {
	return dss.DutyScheduleRepo.GetAllDutySchedules()
}

func (dss *DutyScheduleService) GetDutyScheduleByID(id uint) (*models.DutySchedule, error) {
	return dss.DutyScheduleRepo.GetDutyScheduleByID(id)
}

func (dss *DutyScheduleService) GetDutyScheduleByHuman(id uint) ([]models.DutySchedule, error) {
	return dss.DutyScheduleRepo.GetDutyScheduleByHuman(id)
}

func (dss *DutyScheduleService) GetDutyScheduleByOffice(ID int) ([]dto.CalendarEvent, error) {
	human, _, err := dss.HumanRepo.GetHumanByIDRepo(uint(ID))
	if err != nil {
		return nil, err
	}
	dutySchedule, err := dss.DutyScheduleRepo.GetDutyScheduleByOffice(human.IDOffice)
	if err != nil {
		return nil, fmt.Errorf("lỗi gọi dữ liệu duty: %v", err)
	}
	// Gom nhóm theo key: YYYY-MM-DD|ShiftID
	grouped := make(map[string]dto.CalendarEvent)

	for _, wc := range dutySchedule {
		dateKey := wc.DateWord.Format("2006-01-02")
		shiftKey := wc.Shift.ID // assuming Shift has ID or unique name
		mapKey := fmt.Sprintf("%s|%d", dateKey, shiftKey)

		start := time.Date(
			wc.DateWord.Year(), wc.DateWord.Month(), wc.DateWord.Day(),
			wc.Shift.TimeStart.Hour(), wc.Shift.TimeStart.Minute(), 0, 0, time.Local,
		)
		end := time.Date(
			wc.DateWord.Year(), wc.DateWord.Month(), wc.DateWord.Day(),
			wc.Shift.TimeOut.Hour(), wc.Shift.TimeOut.Minute(), 0, 0, time.Local,
		)

		if event, exists := grouped[mapKey]; exists {
			event.Title = append(event.Title, wc.Human)
			grouped[mapKey] = event
		} else {
			grouped[mapKey] = dto.CalendarEvent{
				Title: []models.Human{wc.Human},
				Start: start,
				End:   end,
			}
		}
	}

	// Chuyển về slice
	var events []dto.CalendarEvent
	for _, e := range grouped {
		events = append(events, e)
	}

	return events, nil
}

func (dss *DutyScheduleService) DeleteDutySchedule(id uint) error {
	return dss.DutyScheduleRepo.DeleteDutySchedule(id)
}
