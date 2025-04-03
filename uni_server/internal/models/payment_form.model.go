package models

import "gorm.io/gorm"

type PaymentForm struct {
	gorm.Model
	Name string `gorm:"column:name; type:varchar(255)" json:"name,omitempty"`
}

func (pf *PaymentForm) TableName() string {
	return "go_db_payment_forms"
}
