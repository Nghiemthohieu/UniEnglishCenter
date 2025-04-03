package repo

import (
	"errors"
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"

	"gorm.io/gorm"
)

type LoginRepo struct{}

func NewLoginRepo() *LoginRepo {
	return &LoginRepo{}
}

func (lr *LoginRepo) CheckLogin(username string, password string) (models.User, error) {
	var user models.User
	if err := global.Mdb.Preload("Position").Preload("Human").Where("username = ?", username).First(&user).Error; err != nil {
		return user, fmt.Errorf("sai tài khoản hoặc mặt khẩu")
	}
	return user, nil
}

func (lr *LoginRepo) Register(user models.User) error {
	tx := global.Mdb.Begin()

	// Kiểm tra username đã tồn tại chưa
	var existingUser models.User
	if err := tx.Where("username = ?", user.Username).First(&existingUser).Error; err == nil {
		tx.Rollback()
		return fmt.Errorf("tài khoản đã tồn tại")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		tx.Rollback()
		return fmt.Errorf("lỗi kiểm tra tài khoản: %v", err)
	}

	// Kiểm tra email có trong bảng nhân sự không
	var human models.Human
	if err := tx.Where("email = ?", user.Username).First(&human).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			tx.Rollback()
			return fmt.Errorf("tài khoản này chưa được thêm vào nhân sự")
		}
		tx.Rollback()
		return fmt.Errorf("lỗi truy vấn nhân sự: %v", err)
	}

	// Tạo tài khoản
	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tạo tài khoản: %v", err)
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}

	return nil
}
