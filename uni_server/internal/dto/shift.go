package dto

import (
	util "uni_server/pkg/utils"
)

type Shift struct {
	ID        int           `json:"id"`
	Shift     string        `gorm:"column:shift; type:varchar(15)" json:"shift"`
	TimeStart util.TimeOnly `gorm:"column:time_start; type:TIME" json:"time_start"`
	TimeOut   util.TimeOnly `gorm:"column:time_out; type:TIME" json:"time_out"`
}
