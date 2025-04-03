package middlewares

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

// Cấu trúc lưu thông tin Rate Limiter cho từng IP
var (
	visitors = make(map[string]*rate.Limiter)
	mu       sync.Mutex
)

// getLimiter - Trả về rate limiter cho từng IP
func getLimiter(ip string) *rate.Limiter {
	mu.Lock()
	defer mu.Unlock()

	// Nếu IP chưa có trong danh sách thì tạo limiter mới
	if _, exists := visitors[ip]; !exists {
		limiter := rate.NewLimiter(2, 5) // Tốc độ: 2 requests/giây, tối đa 5 request trong burst
		visitors[ip] = limiter

		// Xóa IP sau 1 phút để tiết kiệm bộ nhớ
		go func() {
			time.Sleep(1 * time.Minute)
			mu.Lock()
			delete(visitors, ip)
			mu.Unlock()
		}()
	}
	return visitors[ip]
}

// RateLimitMiddleware - Middleware giới hạn số request
func RateLimitMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP() // Lấy IP của user

		limiter := getLimiter(ip)
		if !limiter.Allow() {
			c.JSON(http.StatusTooManyRequests, gin.H{"error": "Too many requests"})
			c.Abort()
			return
		}

		c.Next()
	}
}
