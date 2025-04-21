package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

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

func (wcc *WorkCalendarController) CreateMultiWorkCalendar() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var requests []models.WorkCalendar
		if err := ctx.ShouldBindJSON(&requests); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}

		err := wcc.WorkCalendarService.CreateMultiWorkCalendar(requests)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo nhiều lịch làm việc", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Tạo nhiều lịch làm việc thành công")
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
		workCalendars, err := wcc.WorkCalendarService.GetAllWorkCalendars()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách lịch làm việc", err)
			return
		}
		response.SuccessResponse(ctx, 20001, workCalendars)
	}
}

func (wcc *WorkCalendarController) GetWorkCalendar() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		events, err := wcc.WorkCalendarService.GetWorkCalendar()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "lỗi khi lấy danh sách lịch làm", err)
		}
		response.SuccessResponse(ctx, 20001, events)
	}
}

func (wcc *WorkCalendarController) GetWorkCalendarsOfSubordinates() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		events, err := wcc.WorkCalendarService.GetWorkCalendarsOfSubordinates(id)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "lỗi khi lấy danh sách lịch làm của team", err)
			return
		}
		response.SuccessResponse(ctx, 20001, events)
	}
}
