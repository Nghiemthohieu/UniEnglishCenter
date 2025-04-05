package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type StatusController struct {
	StatusService *services.StatusService
}

func NewStatusController() *StatusController {
	return &StatusController{
		StatusService: services.NewStatusService(),
	}
}

func (sc *StatusController) CreateStatus() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Status
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := sc.StatusService.CreateStatus(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo trạng thái", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo trạng thái thành công")
	}
}

func (sc *StatusController) GetStatusByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		status, err := sc.StatusService.GetStatusByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy trạng thái", err)
			return
		}
		response.SuccessResponse(ctx, 20001, status)
	}
}

func (sc *StatusController) UpdateStatus() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Status
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := sc.StatusService.UpdateStatus(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật trạng thái", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật trạng thái thành công")
	}
}

func (sc *StatusController) DeleteStatus() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = sc.StatusService.DeleteStatus(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa trạng thái", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa trạng thái thành công")
	}
}

func (sc *StatusController) GetAllStatuses() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		statuses, err := sc.StatusService.GetAllStatuses()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách trạng thái", err)
			return
		}
		response.SuccessResponse(ctx, 20001, statuses)
	}
}
