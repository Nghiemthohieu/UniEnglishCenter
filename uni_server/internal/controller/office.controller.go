package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type OfficeController struct {
	OfficeService *services.OfficeService
}

func NewOfficeController() *OfficeController {
	return &OfficeController{
		OfficeService: services.NewOfficeService(),
	}
}

func (oc *OfficeController) CreateOffice() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Office
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := oc.OfficeService.CreateOffice(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo văn phòng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (oc *OfficeController) GetOfficeByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		office, err := oc.OfficeService.GetOfficeByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy thông tin văn phòng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, office)
	}
}

func (oc *OfficeController) UpdateOffice() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Office
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := oc.OfficeService.UpdateOffice(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật văn phòng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (oc *OfficeController) DeleteOffice() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = oc.OfficeService.DeleteOffice(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa văn phòng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (oc *OfficeController) GetAllOffices() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}
		paging.Process()
		offices, total, err := oc.OfficeService.GetAllOffices(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách văn phòng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  offices,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}
