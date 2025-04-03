package util

import (
	"bytes"
	"context"
	"fmt"
	"uni_server/global"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/google/uuid"
)

func UpLoadFile(fileData []byte) (string, error) {
	// Kiểm tra AWS S3 Client
	if global.AwsS3Client == nil {
		return "", fmt.Errorf("AWS S3 client chưa được khởi tạo")
	}

	// Kiểm tra Bucket Name và Region
	bucketName := global.Config.Aws.BucketName
	region := global.Config.Aws.Region
	if bucketName == "" {
		return "", fmt.Errorf("bucket name không hợp lệ")
	}
	if region == "" {
		return "", fmt.Errorf("AWS region không hợp lệ")
	}

	// Tạo tên file duy nhất
	fileName := fmt.Sprintf("%s.jpg", uuid.New().String())

	// Upload file lên S3 (❌ XÓA ACL)
	_, err := global.AwsS3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:      &bucketName,
		Key:         &fileName,
		Body:        bytes.NewReader(fileData),
		ContentType: aws.String("image/jpeg"),
		ACL:         types.ObjectCannedACLPublicRead, // ❌ XÓA DÒNG NÀY
	})
	if err != nil {
		return "", fmt.Errorf("lỗi khi tải lên S3: %w", err)
	}

	// Trả về URL file trên S3
	fileURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, fileName)
	return fileURL, nil
}
