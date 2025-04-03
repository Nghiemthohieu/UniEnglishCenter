package models

import "gorm.io/gorm"

type CustomerSource struct {
	gorm.Model
	Name string `gorm:"column:name; type:varchar(255)" json:"name"`
}

func (cs *CustomerSource) TableName() string {
	return "go_db_customer_sources"
}
