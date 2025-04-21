package controller

import (
	"strconv"
	"uni_server/internal/dto"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type HumanController struct {
	HumanService *services.HumanService
}

func NewHumanController() *HumanController {
	return &HumanController{
		HumanService: services.NewHumanService(),
	}
}

func (hc *HumanController) CreateHumanController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request dto.HumanRequest

		// Parse dữ liệu từ request (chỉ lấy thông tin Human)
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20011, "Dữ liệu không hợp lệ", err)
			return
		}

		// Gọi service để xử lý logic
		human, humanNICs, err := hc.HumanService.CreateHumanService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo Human", err)
			return
		}

		// Trả về kết quả thành công
		response.SuccessResponse(ctx, 20001, gin.H{
			"human":     human,
			"human_nic": humanNICs,
		})
	}
}

// Lấy một Human theo ID
func (hc *HumanController) GetHumanController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		human, humannic, err := hc.HumanService.GetHumanByIDService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 404, 20011, "Không tìm thấy Human", err)
			return
		}

		responsehuman := gin.H{
			"human":     human,
			"human_nic": humannic,
		}

		response.SuccessResponse(ctx, 20001, responsehuman)
	}
}

// Lấy danh sách tất cả Humans
func (hc *HumanController) GetAllHumansController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		humans, err := hc.HumanService.GetAllHumansService()
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi lấy danh sách Humans", err)
			return
		}

		// Trả về kết quả có thông tin phân trang
		response.SuccessResponse(ctx, 20001, humans)
	}
}

// Cập nhật Human
func (hc *HumanController) UpdateHumanController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request dto.HumanRequest
		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}

		// Gọi service cập nhật dữ liệu
		if err := hc.HumanService.UpdateHumanService(request); err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi cập nhật Human", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

// Xóa Human theo ID
func (hc *HumanController) DeleteHumanController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		if err := hc.HumanService.DeleteHumanService(id); err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi khi xóa Human", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}

func (hc *HumanController) CountAllSubordinatesExcludeSelf() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}
		count, err := hc.HumanService.CountAllSubordinatesExcludeSelf(id)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "", err)
			return
		}

		response.SuccessResponse(ctx, 20001, count)
	}
}
