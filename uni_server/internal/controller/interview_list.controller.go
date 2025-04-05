package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type InterviewListController struct {
	InterviewListService *services.InterviewListService
}

func NewInterviewListController() *InterviewListController {
	return &InterviewListController{
		InterviewListService: services.NewInterviewListService(),
	}
}

func (ilc *InterviewListController) CreateInterview() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.InterviewList
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := ilc.InterviewListService.CreateInterviewList(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo lịch phỏng vấn", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (ilc *InterviewListController) GetInterviewByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		interview, err := ilc.InterviewListService.GetInterviewListByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy lịch phỏng vấn", err)
			return
		}
		response.SuccessResponse(ctx, 20001, interview)
	}
}

func (ilc *InterviewListController) UpdateInterview() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.InterviewList
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := ilc.InterviewListService.UpdateInterviewList(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật lịch phỏng vấn", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (ilc *InterviewListController) DeleteInterview() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = ilc.InterviewListService.DeleteInterviewList(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa lịch phỏng vấn", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (ilc *InterviewListController) GetAllInterviews() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		interviews, err := ilc.InterviewListService.GetAllInterviewLists()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách lịch phỏng vấn", err)
			return
		}
		response.SuccessResponse(ctx, 20001, interviews)
	}
}
