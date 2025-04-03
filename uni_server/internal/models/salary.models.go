package models

import "gorm.io/gorm"

type Salary struct {
	gorm.Model

	IDHuman int   `gorm:"column:id_human; type:int" json:"id_human"`
	Human   Human `gorm:"foreignKey:IDHuman;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"human"`

	IDPosition int      `gorm:"column:id_position; type:int" json:"id_position"`
	Position   Position `gorm:"foreignKey:IDPosition;references:ID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"position"`

	TotalTimekeeping    int64 `gorm:"total_timekeeping; type:int" json:"total_timekeeping"`
	PersonalSales       int64 `gorm:"personal_sales; type:int" json:"personal_sales"`
	TeamSales           int64 `gorm:"team_sales; type:int" json:"team_sales"`
	PersonalSalesSalary int64 `gorm:"personal_sales_salary; type:int" json:"personal_sales_salary"`
	TeamSalesSalary     int64 `gorm:"team_sales_salary; type:int" json:"team_sales_salary"`
	TotalSalary         int64 `gorm:"total_salary; type:int" json:"total_salary"`
	Month               int64 `gorm:"month" json:"month"`
	Year                int64 `gorm:"year" json:"year"`
}

func (s *Salary) TableName() string {
	return "go_db_salary"
}
