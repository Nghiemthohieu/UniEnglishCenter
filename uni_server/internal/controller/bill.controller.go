package controller

import (
	"strconv"
	"uni_server/internal/dto"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type BillController struct {
	BillServices *services.BillServices
}

func NewBillController() *BillController {
	return &BillController{
		BillServices: services.NewBillServices(),
	}
}

func (bc *BillController) CreateBillController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request dto.BillRequest

		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}

		err := bc.BillServices.CreateBillService(request)
		if err != nil {
			response.ErrorRespone(ctx, 400, 20011, "Tạo hóa đơn thất bại", err)
			return
		}

		response.SuccessResponse(ctx, 20001, nil)
	}
}

func (bc *BillController) GetAllBillController() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		bills, err := bc.BillServices.GetAllBillServies()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách hóa đơn", err)
			return
		}

		response.SuccessResponse(ctx, 20001, bills)
	}
}

func (bc *BillController) GetBillByIdController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		bill, billImg, err := bc.BillServices.GetBillByIDService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 404, 20011, "Hóa đơn không tìm thấy", err)
			return
		}

		response.SuccessResponse(ctx, 20001, gin.H{
			"bill":     bill,
			"bill_img": billImg,
		})
	}
}

func (bc *BillController) UpdateBillController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request dto.BillRequest
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}

		// Gọi service cập nhật dữ liệu
		if err := bc.BillServices.UpdateBillService(request); err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật Human", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}
