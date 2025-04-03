package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type WorkCalendarController struct {
	WorkCalendarService *services.WorkCalendarService
}

func NewWorkCalendarController() *WorkCalendarController {
	return &WorkCalendarController{
		WorkCalendarService: services.NewWorkCalendarService(),
	}
}

func (wcc *WorkCalendarController) CreateWorkCalendar() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.WorkCalendar
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := wcc.WorkCalendarService.CreateWorkCalendar(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo lịch làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo lịch làm việc thành công")
	}
}

func (wcc *WorkCalendarController) GetWorkCalendarByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		workCalendar, err := wcc.WorkCalendarService.GetWorkCalendarByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy lịch làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, workCalendar)
	}
}

func (wcc *WorkCalendarController) UpdateWorkCalendar() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.WorkCalendar
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := wcc.WorkCalendarService.UpdateWorkCalendar(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật lịch làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật lịch làm việc thành công")
	}
}

func (wcc *WorkCalendarController) DeleteWorkCalendar() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = wcc.WorkCalendarService.DeleteWorkCalendar(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa lịch làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa lịch làm việc thành công")
	}
}

func (wcc *WorkCalendarController) GetAllWorkCalendars() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}
		paging.Process()
		workCalendars, total, err := wcc.WorkCalendarService.GetAllWorkCalendars(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách lịch làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  workCalendars,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}
