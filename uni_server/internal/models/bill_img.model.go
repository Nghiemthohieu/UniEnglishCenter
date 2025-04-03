package models

import "gorm.io/gorm"

type BillImg struct {
	gorm.Model
	IDBill int    `gorm:"column:bill_id; type:int" json:"bill_id"`
	Bill   Bill   `gorm:"foreignKey:IDBill;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"bill"`
	Img    string `gorm:"column:img; type:string" json:"img"`
}

func (BillImg) TableName() string {
	return "go_db_bill_img"
}
