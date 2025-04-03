package controller

import (
	"strconv"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
)

type CourseController struct {
	CourseService *services.CourseServices
}

func NewCourseController() *CourseController {
	return &CourseController{
		CourseService: services.NewCourseService(),
	}
}

func (cc *CourseController) CreateCourseController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Course

		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20011, "Dữ liệu không hợp lệ", err)
			return
		}

		err := cc.CourseService.CreateCourseService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi tạo Course:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Tạo dữ liệu thành công")
	}
}

func (cc *CourseController) UpdateCourseController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request models.Course

		if err := ctx.ShouldBindJSON(&request); err != nil {
			response.ErrorRespone(ctx, 400, 20011, "Dữ liệu không hợp lệ", err)
			return
		}

		err := cc.CourseService.UpdateCourseService(request)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi cập nhật Course:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Cập nhật thành công")
	}
}

func (cc *CourseController) GetAllCoursesController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var paging util.Paging
		if err := ctx.ShouldBindQuery(&paging); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu phân trang không hợp lệ", err)
			return
		}

		paging.Process()

		courses, total, err := cc.CourseService.GetAllCoursesService(paging)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi lấy danh sách Course:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, gin.H{
			"data":  courses,
			"page":  paging.Page,
			"limit": paging.Limit,
			"total": total,
		})
	}
}

func (cc *CourseController) GetCourseByIdController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		course, err := cc.CourseService.GetCourseByIdService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi lấy Course:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, course)
	}
}

func (cc *CourseController) DeleteCourseController() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, err := strconv.Atoi(ctx.Param("id"))
		if err != nil {
			response.ErrorRespone(ctx, 400, 20010, "ID không hợp lệ", err)
			return
		}

		err = cc.CourseService.DeleteCourseService(uint(id))
		if err != nil {
			response.ErrorRespone(ctx, 500, 20010, "Lỗi khi xóa Course:", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "Xóa thành công")
	}
}
