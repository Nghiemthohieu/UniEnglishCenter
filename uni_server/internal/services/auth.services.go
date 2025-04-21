package services

import (
	"fmt"
	"uni_server/internal/dto"
	"uni_server/internal/repo"
)

type AuthServices struct {
	AuthRepo *repo.AuthRepo
}

func NewAuthServices() *AuthServices {
	return &AuthServices{
		AuthRepo: repo.NewAuthRepo(),
	}
}

func (as *AuthServices) Register(input dto.RegisterInput) error {
	if input.Password != input.ConfirmPassword {
		return fmt.Errorf("Mật khẩu xác nhận không khớp")
	}
	err := as.AuthRepo.Register(input)
	if err != nil {
		return err
	}
	return nil
}

func (as *AuthServices) Login(input dto.LoginRequest) (string, error) {
	return as.AuthRepo.Login(input)
}
