package services

import (
	"uni_server/internal/dto"
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type LoginServices struct {
	LoginRepo *repo.LoginRepo
}

func NewLoginService() *LoginServices {
	return &LoginServices{
		LoginRepo: repo.NewLoginRepo(),
	}
}

func (s *LoginServices) CheckLogin(LoginRequest dto.LoginRequest) (string, error) {
	user, err := s.LoginRepo.CheckLogin(LoginRequest.Password, LoginRequest.Password)
	if err != nil {
		return "", err
	}
	if !util.CheckPassword(LoginRequest.Password, user.Password) {
		return "", nil
	} else {
		token, err := util.GenerateToken(int(user.ID), user.Position.Name)
		if err != nil {
			return "", err
		}
		return token, nil
	}
}

func (s *LoginServices) Register(user models.User) (string, error) {
	err := s.LoginRepo.Register(user)
	if err != nil {
		return "", err
	} else {
		token, err := util.GenerateToken(int(user.ID), user.Position.Name)
		if err != nil {
			return "", err
		}
		return token, nil
	}
}
