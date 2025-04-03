package util

import (
	"encoding/base64"
	"fmt"
	"strings"
)

func DecodeBase64Image(base64String string) ([]byte, error) {
	// Loại bỏ phần tiền tố MIME nếu có
	if strings.Contains(base64String, "base64,") {
		parts := strings.Split(base64String, "base64,")
		if len(parts) < 2 {
			return nil, fmt.Errorf("chuỗi Base64 không hợp lệ")
		}
		base64String = parts[1]
	}

	// Giải mã Base64
	return base64.StdEncoding.DecodeString(base64String)
}
