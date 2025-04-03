package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type TimeKeeping struct {
	gorm.Model

	IDHuman    int           `gorm:"column:id_human; type:int" json:"id_human"`
	Name       string        `gorm:"column:name; type:varchar(255)" json:"name"`
	Department string        `gorm:"column:department; type:varchar(100)" json:"department"`
	IDPosition int           `gorm:"column:id_position" json:"id_position"`
	Date       util.DateOnly `gorm:"column:date; type:date" json:"date"`
	Day        string        `gorm:"column:day" json:"day"`
	CheckIn    util.TimeOnly `gorm:"column:check_in; type:time" json:"check_in"`
	CheckOut   util.TimeOnly `gorm:"column:check_out; type:time" json:"check_out"`
	WorkHour   float64       `gorm:"column:work_hour; type:float" json:"work_hour"`
}

func (t *TimeKeeping) TableName() string {
	return "go_db_time_keeping"
}
