package services

import (
	"fmt"
	"time"
	"uni_server/internal/dto"
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

func (wcs *WorkCalendarService) CreateMultiWorkCalendar(requests []models.WorkCalendar) error {
	return wcs.WorkCalendarRepo.CreateMultiWorkCalendar(requests)
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

func (wcs *WorkCalendarService) GetWorkCalendar() ([]dto.CalendarEvent, error) {
	// workCalendars, err := wcs.WorkCalendarRepo.GetAllWorkCalendars()
	workCalendars, err := wcs.GetWorkCalendarsOfSubordinates(1)
	if err != nil {
		return nil, fmt.Errorf("lỗi gọi dữ liệu calendar: %v", err)
	}

	// Gom nhóm theo key: YYYY-MM-DD|ShiftID
	grouped := make(map[string]dto.CalendarEvent)

	for _, wc := range workCalendars {
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

func (wcs *WorkCalendarService) GetWorkCalendarsOfSubordinates(currentUserID int) ([]models.WorkCalendar, error) {
	ids, err := GetAllSubordinateIDs(currentUserID)
	if err != nil {
		return nil, err
	}
	calendars, err := wcs.WorkCalendarRepo.GetWorkCalendarsOfSubordinates(ids)
	if err != nil {
		return nil, fmt.Errorf("lỗi lấy danh sách làm việc của team: %v", err)
	}
	return calendars, nil
}
