package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type ShiftController struct {
	ShiftService *services.ShiftService
}

func NewShiftController() *ShiftController {
	return &ShiftController{
		ShiftService: services.NewShiftService(),
	}
}

func (sc *ShiftController) CreateShift() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Shift
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := sc.ShiftService.CreateShift(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo ca làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (sc *ShiftController) GetShiftByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		shift, err := sc.ShiftService.GetShiftByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy ca làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, shift)
	}
}

func (sc *ShiftController) UpdateShift() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Shift
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := sc.ShiftService.UpdateShift(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật ca làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (sc *ShiftController) DeleteShift() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = sc.ShiftService.DeleteShift(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa ca làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (sc *ShiftController) GetAllShifts() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}
		paging.Process()
		shifts, total, err := sc.ShiftService.GetAllShifts(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách ca làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  shifts,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}
