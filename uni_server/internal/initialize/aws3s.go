package initialize

import (
	"context"
	"fmt"
	"uni_server/global"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// Hàm này thay thế CheckErrerPanic (nếu chưa có)
func checkErrorAndPanic(err error, msg string) {
	if err != nil {
		panic(fmt.Sprintf("%s: %v", msg, err))
	}
}

func InitAws() {
	a := global.Config.Aws
	// Kiểm tra Access Key và Secret Key có hợp lệ không
	if a.AccessKeyID == "" || a.SecretAccessKey == "" {
		panic("AWS AccessKeyID hoặc SecretAccessKey không hợp lệ")
	}

	// Load cấu hình AWS
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(a.Region),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(a.AccessKeyID, a.SecretAccessKey, "")),
	)
	checkErrorAndPanic(err, "AWS Initialization Error")

	global.Logger.Info("Initialized AWS Successfully")

	// Lưu cấu hình AWS vào global
	global.AwsConfig = cfg

	// Khởi tạo AWS S3 Client
	global.AwsS3Client = s3.NewFromConfig(cfg)
	if global.AwsS3Client == nil {
		panic("Lỗi khởi tạo AWS S3 Client")
	}

	global.Logger.Info("AWS S3 Client initialized successfully")
}
