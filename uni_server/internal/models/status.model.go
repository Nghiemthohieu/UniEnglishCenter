package models

import "gorm.io/gorm"

type Status struct {
	gorm.Model
	Name string `gorm:"type:varchar(255);not null" json:"name"`
}

func (s *Status) TableName() string {
	return "go_db_status"
}
