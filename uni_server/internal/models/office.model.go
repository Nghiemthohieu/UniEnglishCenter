package models

import "gorm.io/gorm"

type Office struct {
	gorm.Model
	Name    string `gorm:"column:name; type:varchar(255);not null" json:"name"`
	Acronym string `gorm:"column:acronym; type:varchar(13);not null" json:"acronym"`
}

func (of *Office) TableName() string {
	return "go_db_office"
}
