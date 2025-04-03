package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type PositionController struct {
	PositionService *services.PositionService
}

func NewPositionController() *PositionController {
	return &PositionController{
		PositionService: services.NewPositionService(),
	}
}

func (pc *PositionController) CreatePosition() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Position
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := pc.PositionService.CreatePosition(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo vị trí", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (pc *PositionController) GetPositionByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		position, err := pc.PositionService.GetPositionByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy vị trí", err)
			return
		}
		response.SuccessResponse(ctx, 20001, position)
	}
}

func (pc *PositionController) UpdatePosition() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Position
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := pc.PositionService.UpdatePosition(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật vị trí", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (pc *PositionController) DeletePosition() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = pc.PositionService.DeletePosition(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa vị trí", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (pc *PositionController) GetAllPositions() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}
		paging.Process()
		positions, total, err := pc.PositionService.GetAllPositions(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách vị trí", err)
			return
		}
		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  positions,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}
