package middlewares

import (
	"time"
	"uni_server/global"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// Middleware để ghi log request
func LoggerMiddle() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()

		// Xử lý request
		c.Next()

		// Tính toán thời gian xử lý
		duration := time.Since(startTime)

		// Ghi log bằng Zap Logger
		global.Logger.Info("Request Log",
			zap.String("path", c.Request.URL.Path),
			zap.String("method", c.Request.Method),
			zap.Int("status", c.Writer.Status()),
			zap.Duration("duration", duration),
		)
	}
}
