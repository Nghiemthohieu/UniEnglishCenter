package controller

import (
	"uni_server/internal/dto"
	"uni_server/internal/models"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type LoginController struct {
	LoginServices *services.LoginServices
}

func NewLoginController() *LoginController {
	return &LoginController{LoginServices: services.NewLoginService()}
}

func (c *LoginController) Login() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var LoginRequest dto.LoginRequest

		if err := ctx.ShouldBindJSON(&LoginRequest); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
			return
		}

		token, err := c.LoginServices.CheckLogin(LoginRequest)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "Lỗi đăng nhập", err)
			return
		}

		response.SuccessResponse(ctx, 20001, token)
	}
}

func (c *LoginController) Register() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user models.User

		if err := ctx.ShouldBindJSON(&user); err != nil {
            response.ErrorRespone(ctx, 400, 20010, "Dữ liệu không hợp lệ", err)
            return
        }

		token, err := c.LoginServices.Register(user)
		if err != nil {
            response.ErrorRespone(ctx, 500, 20011, "Lỗi khi đăng ký", err)
            return
        }
		response.SuccessResponse(ctx, 20001, token)
	}
}
