package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type TimeKeepingController struct {
	TimeKeepingService *services.TimeKeepingService
}

func NewTimeKeepingController() *TimeKeepingController {
	return &TimeKeepingController{
		TimeKeepingService: services.NewTimeKeepingService(),
	}
}

func (tkc *TimeKeepingController) CreateTimeKeeping() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.TimeKeeping
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := tkc.TimeKeepingService.CreateTimeKeeping(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo chấm công", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo chấm công thành công")
	}
}

func (tkc *TimeKeepingController) GetTimeKeepingByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		timeKeeping, err := tkc.TimeKeepingService.GetTimeKeepingByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy dữ liệu chấm công", err)
			return
		}
		response.SuccessResponse(ctx, 20001, timeKeeping)
	}
}

func (tkc *TimeKeepingController) UpdateTimeKeeping() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.TimeKeeping
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := tkc.TimeKeepingService.UpdateTimeKeeping(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật chấm công", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật chấm công thành công")
	}
}

func (tkc *TimeKeepingController) DeleteTimeKeeping() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = tkc.TimeKeepingService.DeleteTimeKeeping(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa dữ liệu chấm công", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa chấm công thành công")
	}
}

func (tkc *TimeKeepingController) GetAllTimeKeeping() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		timeKeepings, err := tkc.TimeKeepingService.GetAllTimeKeeping()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách chấm công", err)
			return
		}
		response.SuccessResponse(ctx, 20001, timeKeepings)
	}
}

func (tkc *TimeKeepingController) CreateManyTimeKeeping() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request []models.TimeKeeping
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		if len(request) == 0 {
			response.ErrorRespone(ctx, 400, 20012, "Danh sách chấm công rỗng", nil)
			return
		}

		err := tkc.TimeKeepingService.CreateManyTimeKeeping(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo chấm công", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo nhiều chấm công thành công")
	}
}
