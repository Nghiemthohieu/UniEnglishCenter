package initialize

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/routers"

	"go.uber.org/zap"
)

func Run() {
	LoadConfig()
	fmt.Println("Loading configuration MySql...", global.Config.Mysql.UserName)
	InitLogger()
	global.Logger.Info("Config log ok!!!", zap.String("ok", "Success"))
	InitMySQL()

	// Kiểm tra lỗi AWS trước khi tiếp tục
	defer func() {
		if r := recover(); r != nil {
			global.Logger.Error("Server không thể khởi động do lỗi AWS", zap.Any("error", r))
			panic(r)
		}
	}()
	InitAws()

	r := routers.NewRouter()

	// Start server on port 8080
	r.Run()
}
