package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type WorkCalendar struct {
	gorm.Model
	IDHuman  int           `gorm:"column:id_human; type:int" json:"id_human"`
	Human    Human         `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"human"`
	DateWord util.DateOnly `gorm:"column:date_word; type:date" json:"date_word"`
	IDShift  int           `gorm:"column:id_shift; type:int" json:"id_shift"`
	Shift    Shift         `gorm:"foreignKey:IDShift;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"shift"`
}

func (wc *WorkCalendar) TableName() string {
	return "go_db_work_calendar"
}
