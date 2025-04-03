package global

import (
	"uni_server/pkg/logger"
	"uni_server/pkg/setting"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"gorm.io/gorm"
)

var (
	Config      setting.Config
	Logger      *logger.LoggerZap = logger.NewLogger(Config.Logger)
	Mdb         *gorm.DB
	AwsConfig   aws.Config
	AwsS3Client *s3.Client
)
