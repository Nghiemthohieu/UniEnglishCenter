package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type BaseSalaryController struct {
	BaseSalaryService *services.BaseSalaryServices
}

func NewBaseSalaryController() *BaseSalaryController {
	return &BaseSalaryController{
		BaseSalaryService: services.NewBaseSalaryService(),
	}
}

func (bsc *BaseSalaryController) CreateBaseSalaryController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.BaseSalary

		// Parse dữ liệu từ request (chỉ lấy thông tin Human)
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20011, "Dữ liệu không hợp lệ", err)
			return
		}

		err := bsc.BaseSalaryService.CreateBaseSalaryService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo BaseSalary:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Tạo dự liệu thành công")
	}
}

func (bsc *BaseSalaryController) UpdateBaseSalaryController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.BaseSalary

		// Parse dữ liệu từ request (chỉ lấy thông tin Human)
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20011, "Dữ liệu không hợp lệ", err)
			return
		}

		err := bsc.BaseSalaryService.UpdateBaseSalaryService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo BaseSalary:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (bsc *BaseSalaryController) GetAllBaseSalaryController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		baseSalary, err := bsc.BaseSalaryService.GetALlBaseSalaryService()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo BaseSalary:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, baseSalary)
	}
}

func (bsc *BaseSalaryController) GetBaseSalaryByIdController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		baseSalary, err := bsc.BaseSalaryService.GetBaseSalaryByIdService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo BaseSalary:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, baseSalary)
	}
}

func (bsc *BaseSalaryController) DeleteBaseSalaryController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		err = bsc.BaseSalaryService.DeleteBaseSalaryService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo BaseSalary:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}
