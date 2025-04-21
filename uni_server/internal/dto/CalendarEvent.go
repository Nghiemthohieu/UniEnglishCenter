package dto

import (
	"time"
	"uni_server/internal/models"
)

type CalendarEvent struct {
	Title []models.Human `json:"title"`
	Start time.Time    `json:"start"`
	End   time.Time    `json:"end"`
}
