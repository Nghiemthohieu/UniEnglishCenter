package initialize

import (
	"uni_server/global"
	"uni_server/pkg/logger"
)

func InitLogger() {
	global.Logger = logger.NewLogger(global.Config.Logger)
}
