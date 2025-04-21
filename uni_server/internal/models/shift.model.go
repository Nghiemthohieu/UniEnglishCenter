package models

import (
	"time"

	"gorm.io/gorm"
)

type Shift struct {
	gorm.Model
	Shift     string    `gorm:"column:shift; type:varchar(15)" json:"shift"`
	TimeStart time.Time `gorm:"column:time_start; type:TIME" json:"time_start"`
	TimeOut   time.Time `gorm:"column:time_out; type:TIME" json:"time_out"`
}

func (s *Shift) TableName() string {
	return "go_db_shift"
}
