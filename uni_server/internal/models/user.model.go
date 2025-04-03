package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"column:username;type:varchar(255);not null;unique" json:"username"`
	Password string `gorm:"column:password;type:varchar(255);not null" json:"password"`

	IDTeam  int `gorm:"column:id_team; type:int" json:"id_team"`
	IDHuman int `gorm:"column:id_human; type:int" json:"id_human"`

	IDPosition int      `gorm:"column:id_position" json:"id_position"`
	Position   Position `gorm:"foreignKey:IDPosition;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"position"`

	Img string `gorm:"column:img;type:varchar(255)" json:"img"`
}

func (u *User) TableName() string {
	return "go_db_user"
}
