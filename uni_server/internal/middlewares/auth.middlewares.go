package middlewares

import (
	"net/http"
	"strings"
	"uni_server/global"
	util "uni_server/pkg/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// AuthMiddleware - Middleware kiểm tra JWT token
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Lấy token từ Header Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			global.Logger.Warn("Authorization header missing")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// Tách "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			global.Logger.Warn("Invalid Authorization format")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		tokenString := tokenParts[1]

		// Xác thực JWT token
		claims, err := util.VerifyToken(tokenString)
		if err != nil {
			global.Logger.Warn("Invalid token", zap.Error(err))
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Lưu thông tin user vào context
		c.Set("userID", claims.UserID)
		c.Set("roles", claims.Roles) // Nếu có quyền, lưu vào context

		// Cho phép request tiếp tục
		c.Next()
	}
}
