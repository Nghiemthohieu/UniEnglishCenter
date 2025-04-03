package controller

import (
	"strconv"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type DSTeamController struct {
	DSTeamService *services.DSTeamService
}

func NewDSTeamController() *DSTeamController {
	return &DSTeamController{
		DSTeamService: services.NewDSTeamService(),
	}
}

// 🟢 Tính tổng doanh số của nhân viên + cấp dưới (lọc theo tháng/năm)
func (c *DSTeamController) GetTotalSalesByTeam() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		// Lấy `year` và `month` từ query params
		year, _ := strconv.Atoi(ctx.Param("year"))
		month, _ := strconv.Atoi(ctx.Param("month"))

		totalSales, err := c.DSTeamService.GetTotalSalesByTeam(id, year, month)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy tổng doanh số", err)
			return
		}

		response.SuccessResponse(ctx, 20001, gin.H{
			"id_human":    id,
			"year":        year,
			"month":       month,
			"total_sales": totalSales,
		})
	}
}

// 🟢 Lấy doanh số của từng nhân viên theo tháng/năm
func (c *DSTeamController) GetSalesByEmployee() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		year, _ := strconv.Atoi(ctx.Param("year"))
		month, _ := strconv.Atoi(ctx.Param("month"))

		data, err := c.DSTeamService.GetSalesByEmployee(year, month)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách doanh số", err)
			return
		}

		response.SuccessResponse(ctx, 20001, gin.H{
			"year":  year,
			"month": month,
			"data":  data,
		})
	}
}
