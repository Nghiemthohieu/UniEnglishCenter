package models

import "gorm.io/gorm"

type BaseSalary struct {
	gorm.Model
	IDPosition uint     `gorm:"column:id_position; type:int" json:"id_position"`
	Position   Position `gorm:"foreignKey:IDPosition;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"position"`
	CarePart1  int      `gorm:"column:care_part_1; type:int" json:"care_part_1"`
	Target1    int      `gorm:"column:target_1; type:int" json:"target_1"`
	CarePart2  int      `gorm:"column:care_part_2; type:int" json:"care_part_2"`
	Target2    int      `gorm:"column:target_2; type:int" json:"target_2"`
	CarePart3  int      `gorm:"column:care_part_3; type:int" json:"care_part_3"`
}

func (b *BaseSalary) TableName() string {
	return "go_db_base_salary"
}
