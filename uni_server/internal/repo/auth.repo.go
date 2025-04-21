package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
)

type AuthRepo struct {
}

func NewAuthRepo() *AuthRepo {
	return &AuthRepo{}
}

func (ar *AuthRepo) Register(input dto.RegisterInput) error {
	// Kiểm tra email có trong bảng Human không
	var human models.Human
	if err := global.Mdb.Where("email = ?", input.Email).First(&human).Error; err != nil {
		return fmt.Errorf("email không có trong dữ liệu nhân viên!")
	}

	// Kiểm tra đã có tài khoản chưa
	var existingUser models.User
	if err := global.Mdb.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		return fmt.Errorf("tài khoản đã tồn tại")
	}

	// Mã hóa mật khẩu
	hashedPassword, err := util.HashPassword(input.Password)
	if err != nil {
		return fmt.Errorf("lỗi khi mã hóa mật khẩu: %v", err)
	}

	// Tạo tài khoản user
	user := models.User{
		Username:   input.Name,
		Email:      input.Email,
		Password:   hashedPassword,
		IDPosition: human.IDPosition,
		IDHuman:    int(human.ID), // mặc định role staff
	}

	if err := global.Mdb.Create(&user).Error; err != nil {
		return fmt.Errorf("lỗi khi tạo tài khoản: %v", err)
	}

	return nil
}

func (ar *AuthRepo) Login(input dto.LoginRequest) (string, error) {
	var user models.User
	var role models.Position

	if err := global.Mdb.Where("email = ?", input.Username).First(&user).Error; err != nil {
		return "", fmt.Errorf("lỗi khi kiểm tra email: %v", err)
	}

	if !util.CheckPassword(user.Password, input.Password) {
		return "", fmt.Errorf("tài khoản hoặc mật khẩu không chính xác")
	}

	if err := global.Mdb.Preload("Permissions").Where("id = ?", user.IDPosition).First(&role).Error; err != nil {
		return "", fmt.Errorf("lỗi lấy dữ liệu position: %v", err)
	}

	var perms []string
	for _, p := range role.Permissions {
		perms = append(perms, p.Name) // hoặc p.Path hoặc format lại như bạn cần
	}

	token, err := util.GenerateToken(int(user.ID), user.IDPosition, perms)
	if err != nil {
		return "", fmt.Errorf("lỗi lấy token: %v", err)
	}
	return token, nil
}
