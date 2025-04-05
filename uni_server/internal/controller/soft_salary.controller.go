package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type SoftSalaryController struct {
	SoftSalaryService *services.SoftSalaryService
}

func NewSoftSalaryController() *SoftSalaryController {
	return &SoftSalaryController{
		SoftSalaryService: services.NewSoftSalaryService(),
	}
}

func (ssc *SoftSalaryController) CreateSoftSalary() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.SoftSalary
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := ssc.SoftSalaryService.CreateSoftSalary(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo dữ liệu lương mềm", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (ssc *SoftSalaryController) GetSoftSalaryByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		softSalary, err := ssc.SoftSalaryService.GetSoftSalaryByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy dữ liệu lương mềm", err)
			return
		}
		response.SuccessResponse(ctx, 20001, softSalary)
	}
}

func (ssc *SoftSalaryController) UpdateSoftSalary() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.SoftSalary
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := ssc.SoftSalaryService.UpdateSoftSalary(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật dữ liệu lương mềm", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (ssc *SoftSalaryController) DeleteSoftSalary() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = ssc.SoftSalaryService.DeleteSoftSalary(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa dữ liệu lương mềm", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (ssc *SoftSalaryController) GetAllSoftSalaries() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		softSalaries, err := ssc.SoftSalaryService.GetAllSoftSalaries()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách lương mềm", err)
			return
		}
		response.SuccessResponse(ctx, 20001, softSalaries)
	}
}
