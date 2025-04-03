package response

const (
	ErrCodeSuccess     = 20001
	ErrInvalidToken    = 30001
	ErrInvalidDatabase = 20010
	ErrRequestData     = 20011
)

var msg = map[int]string{
	ErrCodeSuccess:     "Success", // ✅ Sửa lỗi chính tả
	ErrInvalidToken:    "Token is invalid",
	ErrInvalidDatabase: "Database is invalid",
	ErrRequestData:     "Invalid request data",
}
