package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type DutyScheduleController struct {
	DutyScheduleService *services.DutyScheduleService
}

func NewDutyScheduleController() *DutyScheduleController {
	return &DutyScheduleController{
		DutyScheduleService: services.NewDutyScheduleService(),
	}
}

func (dsc *DutyScheduleController) CreateDutySchedule() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.DutySchedule
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := dsc.DutyScheduleService.CreateDutySchedule(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo lịch trực", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (dsc *DutyScheduleController) GetDutyScheduleByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		schedule, err := dsc.DutyScheduleService.GetDutyScheduleByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy lịch trực", err)
			return
		}
		response.SuccessResponse(ctx, 20001, schedule)
	}
}

func (dsc *DutyScheduleController) UpdateDutySchedule() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.DutySchedule
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := dsc.DutyScheduleService.UpdateDutySchedule(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật lịch trực", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (dsc *DutyScheduleController) DeleteDutySchedule() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = dsc.DutyScheduleService.DeleteDutySchedule(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa lịch trực", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (dsc *DutyScheduleController) GetAllDutySchedules() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		schedules, err := dsc.DutyScheduleService.GetAllDutySchedules()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách lịch trực", err)
			return
		}
		response.SuccessResponse(ctx, 20001, schedules)
	}
}
