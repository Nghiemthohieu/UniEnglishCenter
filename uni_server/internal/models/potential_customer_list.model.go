package models

import "gorm.io/gorm"

type PotentialCustomerList struct {
	gorm.Model

	IDHuman int   `gorm:"column:id_human; type:int" json:"id_human"`
	Human   Human `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"human"`

	Name               string `gorm:"column:name; type:varchar(255)" json:"name"`
	PhoneNumber        string `gorm:"column:phone_number; type:varchar(13)" json:"phone_number"`
	Relationship       string `gorm:"column:relationship; type:varchar(255)" json:"relationship"`
	BirtYear           int    `gorm:"column:birt_year; type:int" json:"birt_year"`
	School             string `gorm:"column:school; type:varchar(255)" json:"school"`
	Majors             string `gorm:"column:majors; type:varchar(50)" json:"majors"`
	Address            string `gorm:"column:address; type:varchar(50)" json:"address"`
	FreeTime           string `gorm:"column:free_time; type:varchar(50)" json:"free_time"`
	Problem            string `gorm:"column:problem; type:varchar(250)" json:"problem"`
	Level              string `gorm:"column:level; type:varchar(50)" json:"level"`
	CustomerNeed       string `gorm:"column:customer_need; type:varchar(50)" json:"customer_need"`
	Target             string `gorm:"column:target; type:varchar(100)" json:"target"`
	StudyTime          string `gorm:"column:study_time; type:varchar(50)" json:"study_time"`
	LevelUnderstanding string `gorm:"column:level_understanding; type:varchar(250)" json:"level_understanding"`
	Concerned          string `gorm:"column:concerned; type:varchar(50)" json:"concerned"`
	FamilyCircumstance string `gorm:"column:family_circumstance; type:varchar(100)" json:"family_circumstance"`
	FamilyOpinion      string `gorm:"column:family_opinion; type:varchar(100)" json:"family_opinion"`
	FamilyTuition      string `gorm:"column:family_tuition; type:varchar(100)" json:"family_tuition"`
	Note               string `gorm:"column:note; type:varchar(255)" json:"note"`
}

func (PotentialCustomerList) TableName() string {
	return "go_db_potential_customer_list"
}
