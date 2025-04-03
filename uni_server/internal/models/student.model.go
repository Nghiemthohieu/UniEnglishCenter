package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model

	IDHuman int   `gorm:"column:id_human; type:int" json:"id_human"`
	Human   Human `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"human"`

	RegistrationDate util.DateOnly `gorm:"column:registration_date; type:date" json:"registration_date"`
	Name             string        `gorm:"column:name; type:varchar(255)" json:"name"`
	PhoneNumber      string        `gorm:"column:phone_number; type:varchar(13)" json:"phone_number"`
	BirthDay         util.DateOnly `gorm:"column:birth_day; type:date" json:"birth_day"`
	TotalTuition     int           `gorm:"column:total_tuition; type:int" json:"total_tuition"`

	IDOffice int    `gorm:"column:id_office; type:int" json:"id_office"`
	Office   Office `gorm:"foreignKey:IDOffice;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"office"`

	Email   string   `gorm:"column:email;type:varchar(255)" json:"email"`
	Courses []Course `gorm:"many2many:go_student_courses"`
}

func (s *Student) TableName() string {
	return "go_db_students"
}
