package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type PotentialCustomerListController struct {
	Service *services.PotentialCustomerService
}

func NewPotentialCustomerListController() *PotentialCustomerListController {
	return &PotentialCustomerListController{
		Service: services.NewPotentialCustomerService(),
	}
}

func (pclc *PotentialCustomerListController) CreatePotentialCustomer() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.PotentialCustomerList
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 30010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := pclc.Service.CreatePotentialCustomer(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 30011, "Lỗi khi tạo khách hàng tiềm năng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Tạo khách hàng tiềm năng thành công")
	}
}

func (pclc *PotentialCustomerListController) GetPotentialCustomerByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 30010, "ID không hợp lệ", err)
			return
		}
		customer, err := pclc.Service.GetPotentialCustomerByID(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 30011, "Lỗi khi lấy thông tin khách hàng tiềm năng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, customer)
	}
}

func (pclc *PotentialCustomerListController) UpdatePotentialCustomer() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.PotentialCustomerList
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 30010, "Dữ liệu không hợp lệ", err)
			return
		}
		err := pclc.Service.UpdatePotentialCustomer(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 30011, "Lỗi khi cập nhật thông tin khách hàng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Cập nhật khách hàng tiềm năng thành công")
	}
}

func (pclc *PotentialCustomerListController) DeletePotentialCustomer() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 30010, "ID không hợp lệ", err)
			return
		}
		err = pclc.Service.DeletePotentialCustomer(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 30011, "Lỗi khi xóa khách hàng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, "Xóa khách hàng tiềm năng thành công")
	}
}

func (pclc *PotentialCustomerListController) GetAllPotentialCustomers() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		customers, err := pclc.Service.GetAllPotentialCustomers()
		if err != nil {
			response.ErrorRespone(ctx, 500, 30011, "Lỗi khi lấy danh sách khách hàng", err)
			return
		}
		response.SuccessResponse(ctx, 20001, customers)
	}
}

func (pclc *PotentialCustomerListController) GetPotentialCustomerByHumanID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		humanID, err := strconv.Atoi(ctx.Param("human_id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 30010, "Human ID không hợp lệ", err)
			return
		}

		customers, err := pclc.Service.GetPotentialCustomerByHumanID(humanID)
		if err != nil {
			response.ErrorRespone(ctx, 500, 30011, "Lỗi khi lấy danh sách khách hàng tiềm năng", err)
			return
		}

		response.SuccessResponse(ctx, 20001, customers)
	}
}
