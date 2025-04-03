package models

import "gorm.io/gorm"

type HumanNIC struct {
	gorm.Model
	IDHuman int    `gorm:"column:id_human;type:int" json:"id_human"`
	Human   Human  `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"human"`
	NIC     string `gorm:"column:nic;type:varchar(255)" json:"nic"`
}

func (HumanNIC) TableName() string {
	return "go_db_human_nic"
}
