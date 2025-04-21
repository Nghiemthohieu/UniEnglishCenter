package util

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// Khóa bí mật (secret key) dùng để ký token
var jwtSecret = []byte("your_secret_key")

// JWTClaims định nghĩa payload của JWT
type JWTClaims struct {
	UserID      int      `json:"user_id"`
	Roles       int      `json:"roles"`
	Permissions []string `json:"permissions"`
	jwt.RegisteredClaims
}

// GenerateToken - Tạo JWT Token cho user
func GenerateToken(userID int, roles int, permissions []string) (string, error) {
	claims := JWTClaims{
		UserID:      userID,
		Roles:       roles,
		Permissions: permissions, // 👈 Thêm permissions
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func VerifyToken(tokenString string) (*JWTClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*JWTClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	// Kiểm tra token có hết hạn không
	if claims.ExpiresAt.Time.Before(time.Now()) {
		return nil, errors.New("token expired")
	}

	return claims, nil
}
