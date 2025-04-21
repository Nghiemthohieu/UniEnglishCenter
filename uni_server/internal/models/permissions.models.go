package models

import "gorm.io/gorm"

type Permissions struct {
	gorm.Model
	Name        string `gorm:"column:name;type:varchar(255);not null" json:"name"`
	Method      string `gorm:"column:method; type:varchar(255);not null" json:"method"`
	Path        string `gorm:"column:path; type:varchar(255);not null" json:"path"`
	Description string `gorm:"column:description; type:varchar(255);not null" json:"description"`
	Module      string `gorm:"column:module; type:varchar(255);not null" json:"module"`
}

func (p *Permissions) TableName() string {
	return "go_db_permissions"
}
