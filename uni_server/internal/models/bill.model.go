package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model

	IDHuman int   `gorm:"column:id_human; type:int" json:"id_human"`
	Human   Human `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"human"`

	RegistrationDate util.DateOnly `gorm:"column:registration_date; type:date" json:"registration_date"`
	Name             string        `gorm:"column:name; type:varchar(255)" json:"name"`
	PhoneNumber      string        `gorm:"column:phone_number; type:varchar(13)" json:"phone_number"`
	BirthDay         util.DateOnly `gorm:"column:birth_day; type:date" json:"birth_day"`
	InvoiceCode      int           `gorm:"column:invoice_code; type:int" json:"invoice_code"`
	PayMoney         int           `gorm:"column:pay_money; type:int" json:"pay_money"`
	TotalTuition     int           `gorm:"column:total_tuition; type:int" json:"total_tuition"`

	IDOffice int    `gorm:"column:id_office; type:int" json:"id_office"`
	Office   Office `gorm:"foreignKey:IDOffice;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"office"`

	IDCustomerSource int            `gorm:"column:id_customer_source; type:int" json:"id_customer_source"`
	CustomerSource   CustomerSource `gorm:"foreignKey:IDCustomerSource;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"customer_source"`

	IDPaymentForm int         `gorm:"column:id_payment_form; type:int" json:"id_payment_form"`
	PaymentForm   PaymentForm `gorm:"foreignKey:IDPaymentForm;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"payment_form"`

	PaymentNum int      `gorm:"column:payment_num; type:int" json:"payment_num"`
	Email      string   `gorm:"column:email; type:varchar(255)" json:"email"`
	Note       string   `gorm:"column:note; type:varchar(255)" json:"note"`
	Courses    []Course `gorm:"many2many:go_bill_courses"`
}

func (b *Bill) TableName() string {
	return "go_db_bill"
}
