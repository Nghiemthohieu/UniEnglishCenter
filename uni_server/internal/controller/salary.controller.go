package controller

import (
	"strconv"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type SalaryController struct {
	SalaryService *services.SalaryService
}

func NewSalaryController() *SalaryController {
	return &SalaryController{SalaryService: services.NewSalaryService()}
}

func (c *SalaryController) GetAllSalaries() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		year, _ := strconv.Atoi(ctx.Param("year"))
		month, _ := strconv.Atoi(ctx.Param("month"))
		salaries, err := c.SalaryService.GetAllSalaries(year, month)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi server", err)
			return
		}
		response.SuccessResponse(ctx, 20001, salaries)
	}
}
