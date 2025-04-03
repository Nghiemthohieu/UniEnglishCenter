package util

import (
	"database/sql/driver"
	"errors"
	"strings"
	"time"
)

const (
	layoutISO             = "2006-01-02"
	layoutCustom          = "02/01/2006" // Định dạng DD/MM/YYYY
	layoutAlternate       = "2006-01-02T15:04:05Z07:00"
	layoutCustomAlternate = "02/01/2006T15:04:05Z"
)

// DateOnly là kiểu tùy chỉnh để chỉ lưu ngày tháng (YYYY-MM-DD)
type DateOnly struct {
	time.Time
}

// UnmarshalJSON để parse giá trị từ JSON
func (d *DateOnly) UnmarshalJSON(b []byte) error {
	strInput := strings.Trim(string(b), `"`) // Loại bỏ dấu ngoặc kép

	// Thử parse theo định dạng DD/MM/YYYY
	parsedTime, err := time.Parse(layoutCustom, strInput)
	if err == nil {
		d.Time = parsedTime
		return nil
	}

	// Nếu thất bại, thử parse theo định dạng YYYY-MM-DD
	parsedTime, err = time.Parse(layoutISO, strInput)
	if err == nil {
		d.Time = parsedTime
		return nil
	}

	// Nếu cả hai đều thất bại
	return errors.New("invalid date format, expected DD/MM/YYYY or YYYY-MM-DD")
}

// MarshalJSON để định dạng lại giá trị khi trả về JSON
func (d DateOnly) MarshalJSON() ([]byte, error) {
	return []byte(`"` + d.Time.Format(layoutCustom) + `"`), nil
}

// Scan giúp GORM đọc giá trị từ cơ sở dữ liệu
func (d *DateOnly) Scan(value interface{}) error {
	if value == nil {
		d.Time = time.Time{}
		return nil
	}

	switch v := value.(type) {
	case time.Time:
		d.Time = v
		return nil
	case []byte:
		parsed, err := time.Parse(layoutISO, string(v))
		if err != nil {
			return err
		}
		d.Time = parsed
		return nil
	case string:
		parsed, err := time.Parse(layoutISO, v)
		if err != nil {
			return err
		}
		d.Time = parsed
		return nil
	default:
		return errors.New("invalid type for DateOnly")
	}
}

// Value giúp GORM lưu giá trị vào cơ sở dữ liệu
func (d DateOnly) Value() (driver.Value, error) {
	if d.IsZero() {
		return nil, nil
	}
	return d.Format(layoutISO), nil
}
