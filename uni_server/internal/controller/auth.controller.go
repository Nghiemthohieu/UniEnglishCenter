package controller

import (
	"uni_server/internal/dto"
	"uni_server/internal/services"
	"uni_server/pkg/response"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	AuthServices *services.AuthServices
}

func NewAuthController() *AuthController {
	return &AuthController{
		AuthServices: services.NewAuthServices(),
	}
}

func (ac *AuthController) Register() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var input dto.RegisterInput
		if err := ctx.ShouldBindJSON(&input); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "", err)
			return
		}

		if err := ac.AuthServices.Register(input); err != nil {
			response.ErrorRespone(ctx, 500, 20011, "", err)
			return
		}

		response.SuccessResponse(ctx, 20001, "")
	}
}

func (ac *AuthController) Login() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var input dto.LoginRequest
		if err := ctx.ShouldBindJSON(&input); err != nil {
			response.ErrorRespone(ctx, 400, 20010, "", err)
			return
		}
		token, err := ac.AuthServices.Login(input)
		if err != nil {
			response.ErrorRespone(ctx, 500, 20011, "", err)
			return
		}
		response.SuccessResponse(ctx, 20001, token)
	}
}
