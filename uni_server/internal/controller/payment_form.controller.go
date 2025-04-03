package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type PaymentFormController struct {
	PaymentFormService *services.PaymentFormService
}

func NewPaymentFormController() *PaymentFormController {
	return &PaymentFormController{
		PaymentFormService: services.NewPaymentFormService(),
	}
}

func (pfc *PaymentFormController) CreatePaymentForm() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.PaymentForm
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := pfc.PaymentFormService.CreatePaymentForm(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi tạo phương thức thanh toán", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (pfc *PaymentFormController) GetPaymentFormByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		paymentForm, err := pfc.PaymentFormService.GetPaymentFormByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy phương thức thanh toán", err)
			return
		}
		response.SuccessResponse(ctx, 20001, paymentForm)
	}
}

func (pfc *PaymentFormController) UpdatePaymentForm() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.PaymentForm
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := pfc.PaymentFormService.UpdatePaymentForm(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật phương thức thanh toán", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (pfc *PaymentFormController) DeletePaymentForm() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		err = pfc.PaymentFormService.DeletePaymentForm(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa phương thức thanh toán", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (pfc *PaymentFormController) GetAllPaymentForms() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}
		paging.Process()
		paymentForms, total, err := pfc.PaymentFormService.GetAllPaymentForms(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách phương thức thanh toán", err)
			return
		}
		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  paymentForms,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}
