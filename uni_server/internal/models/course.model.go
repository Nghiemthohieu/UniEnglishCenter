package models

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	Name string `gorm:"column:name; type:varchar(255)" json:"name"`
}

func (Course) TableName() string {
	return "go_db_courses"
}
