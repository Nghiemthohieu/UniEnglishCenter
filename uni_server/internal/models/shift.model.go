package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type Shift struct {
	gorm.Model
	Shift     string        `gorm:"column:shift; type:varchar(15)" json:"shift"`
	TimeStart util.TimeOnly `gorm:"column:time_start; type:time" json:"time_start"`
	TimeOut   util.TimeOnly `gorm:"column:time_out; type:time" json:"time_out"`
}

func (s *Shift) TableName() string {
	return "go_db_shift"
}
