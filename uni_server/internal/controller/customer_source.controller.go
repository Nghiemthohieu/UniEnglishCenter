package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type CustomerSourceController struct {
	CustomerSourceService *services.CustomerSourceServices
}

func NewCustomerSourceController() *CustomerSourceController {
	return &CustomerSourceController{
		CustomerSourceService: services.NewCustomerSourceService(),
	}
}

func (csc *CustomerSourceController) CreateCustomerSourceController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.CustomerSource
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := csc.CustomerSourceService.CreateCustomerSourceService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo Customer Source", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (csc *CustomerSourceController) GetAllCustomerSourcesController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}
		paging.Process()
		sources, total, err := csc.CustomerSourceService.GetAllCustomerSourcesService(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách Customer Source", err)
			return
		}
		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  sources,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}

func (csc *CustomerSourceController) GetCustomerSourceByIdController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		source, err := csc.CustomerSourceService.GetCustomerSourceByIdService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy Customer Source", err)
			return
		}
		response.SuccessResponse(ctx, 20001, source)
	}
}

func (csc *CustomerSourceController) UpdateCustomerSourceController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.CustomerSource
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := csc.CustomerSourceService.UpdateCustomerSourceService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật Customer Source", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (csc *CustomerSourceController) DeleteCustomerSourceController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = csc.CustomerSourceService.DeleteCustomerSourceService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa Customer Source", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}
