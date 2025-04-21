package middlewares
import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// Permission kiểm tra xem người dùng có quyền cụ thể hay không
func Permission(permissionName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Lấy danh sách permission từ context (đã gán từ middleware trước đó hoặc sau khi decode token)
		permissions, exists := c.Get("permissions")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Không xác định quyền truy cập"})
			c.Abort()
			return
		}

		// Ép kiểu về []string
		userPermissions, ok := permissions.([]string)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Dữ liệu quyền bị lỗi"})
			c.Abort()
			return
		}

		// Kiểm tra quyền
		hasPermission := false
		for _, p := range userPermissions {
			if strings.EqualFold(p, permissionName) {
				hasPermission = true
				break
			}
		}

		if !hasPermission {
			c.JSON(http.StatusForbidden, gin.H{"error": "Không có quyền truy cập"})
			c.Abort()
			return
		}

		// Nếu có quyền, tiếp tục xử lý
		c.Next()
	}
}
