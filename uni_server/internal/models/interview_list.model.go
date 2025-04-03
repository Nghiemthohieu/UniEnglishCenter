package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type InterviewList struct {
	gorm.Model
	Name          string        `gorm:"type:varchar(255)" json:"name"`
	PhoneNumber   string        `gorm:"column:phone_number; type:varchar(13)" json:"phone_number"`
	Email         string        `gorm:"column:email; type:varchar(255)" json:"email"`
	IDHuman       int           `gorm:"column:id_human; type:int" json:"id_human"`
	Human         Human         `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"human"`
	School        string        `gorm:"column:school; type:varchar(255)" json:"school"`
	BirtYear      int           `gorm:"column:birt_year; type:int" json:"birt_year"`
	DateInterview util.DateOnly `gorm:"column:date_interview; type:date" json:"date_interview"`
	TimeInterview string        `gorm:"column:time_interview; type:varchar(255)" json:"time_interview"`
	FormInterview string        `gorm:"column:form_interview; type:varchar(255)" json:"form_inter"`
	Result        string        `gorm:"column:result; type:varchar(255)" json:"result"`
	Notes         string        `gorm:"column:notes; type:text" json:"notes"`
}

func (InterviewList) TableName() string {
	return "go_db_interview_list"
}
