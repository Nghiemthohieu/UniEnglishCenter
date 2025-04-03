package models

import "gorm.io/gorm"

type Team struct {
	gorm.Model

	IDTeam  int `gorm:"column:id_team; type:int" json:"id_team"`
	IDHuman int `gorm:"column:id_human; type:int" json:"id_human"`

	TeamLeader Human `gorm:"foreignKey:IDTeam;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"team_leader"`
	Member     Human `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"member"`
}

func (t *Team) TableName() string {
	return "go_db_team"
}
