package models

import (
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type Human struct {
	gorm.Model
	Name        string        `gorm:"column:name; type:varchar(255)" json:"name"`
	IDPosition  int           `gorm:"column:id_position" json:"id_position"`
	Position    Position      `gorm:"foreignKey:IDPosition;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"position"`
	IDOffice    int           `gorm:"column:id_office" json:"id_office"`
	Office      Office        `gorm:"foreignKey:IDOffice;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"office"`
	IDStatus    int           `gorm:"column:id_status" json:"id_status"`
	Status      Status        `gorm:"foreignKey:IDStatus;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"status"`
	StartWord   util.DateOnly `gorm:"column:start_word; type:date" json:"start_word"`
	Hometown    string        `gorm:"column:hometown; type:varchar(255)" json:"hometown"`
	PhoneNumber string        `gorm:"column:phone_number; type:varchar(13)" json:"phone_number"`
	BirthDay    util.DateOnly `gorm:"column:birth_day; type:date" json:"birth_day"`
	Gender      string        `gorm:"column:gender; type:varchar(3)" json:"gender"`
	Email       string        `gorm:"column:email; type:varchar(255)" json:"email"`
	Team        []Human       `gorm:"many2many:go_team_human"`
}

func (h *Human) TableName() string {
	return "go_db_human"
}
