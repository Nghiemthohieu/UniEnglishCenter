package models

import "gorm.io/gorm"

type Position struct {
	gorm.Model
	Name        string        `gorm:"type:varchar(255);not null" json:"name"`
	Acronym     string        `gorm:"column:acronym; type:varchar(13);not null" json:"acronym"`
	Permissions []Permissions `gorm:"many2many:go_position_permission"`
}

func (p *Position) TableName() string {
	return "go_db_position"
}
