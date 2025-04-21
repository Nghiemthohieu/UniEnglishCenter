package repo

import (
	"uni_server/global"
	"uni_server/internal/models"
)

type DSTeamRepo struct{}

func NewDSTeamRepo() *DSTeamRepo {
	return &DSTeamRepo{}
}

// Lấy danh sách cấp dưới của một nhân viên
func GetSubordinates(humanID int) ([]int, error) {
	var subordinates []int

	err := global.Mdb.Table("go_team_human").
		Select("human_id").
		Where("team_id = ?", humanID).
		Scan(&subordinates).Error

	if err != nil {
		return nil, err
	}
	return subordinates, nil
}

// 🔹 Tính tổng doanh số của nhân viên + cấp dưới (lọc theo tháng & năm)
func (dsr *DSTeamRepo) GetTotalSalesByTeam(humanID int, year int, month int) (int, error) {
	var totalSales int

	// 🔹 Doanh số riêng của nhân viên trong tháng/năm
	err := global.Mdb.Table("go_db_bill").
		Select("COALESCE(SUM(pay_money), 0)").
		Where("id_human = ? AND YEAR(registration_date) = ? AND MONTH(registration_date) = ?", humanID, year, month).
		Scan(&totalSales).Error
	if err != nil {
		return 0, err
	}

	// 🔹 Lấy danh sách cấp dưới
	subordinates, err := GetSubordinates(humanID)
	if err != nil {
		return 0, err
	}

	// 🔹 Đệ quy tính doanh số của từng cấp dưới trong tháng/năm
	for _, subID := range subordinates {
		subSales, err := dsr.GetTotalSalesByTeam(subID, year, month)
		if err == nil {
			totalSales += subSales
		}
	}

	return totalSales, nil
}

// 🔹 Lấy doanh số của từng nhân viên theo tháng & năm
func (dsr *DSTeamRepo) GetSalesByEmployee(year int, month int) ([]models.SalesData, error) {
	var sales []models.SalesData

	err := global.Mdb.Table("go_db_bill").
		Select("id_human, COALESCE(SUM(pay_money), 0) as total_sales").
		Where("YEAR(registration_date) = ? AND MONTH(registration_date) = ?", year, month).
		Group("id_human").
		Scan(&sales).Error

	if err != nil {
		return nil, err
	}
	return sales, nil
}

func (dsr *DSTeamRepo) GetSalesByIdEmployee(humanID int, year int, month int) (models.SalesData, error) {
	var sales models.SalesData

	err := global.Mdb.Table("go_db_bill").
		Select("id_human, COALESCE(SUM(pay_money), 0) as total_sales").
		Where("id_human = ? AND YEAR(registration_date) = ? AND MONTH(registration_date) = ?", humanID, year, month).
		Group("id_human"). // 🔥 THÊM GROUP BY
		Scan(&sales).Error

	if err != nil {
		return sales, err
	}
	return sales, nil
}

func (dsr *DSTeamRepo) GetSalesByEmployeeID(id int, year int, month int) (models.SalesData, error) {
	var sales models.SalesData

	err := global.Mdb.Table("go_db_bill").
		Select("id_human, COALESCE(SUM(pay_money), 0) as total_sales").
		Where("id_human = ? AND YEAR(registration_date) = ? AND MONTH(registration_date) = ?", id, year, month).
		Group("id_human").
		Scan(&sales).Error

	if err != nil {
		return sales, err
	}
	return sales, nil
}
