package util

import (
	"database/sql/driver"
	"errors"
	"strings"
	"time"
)

const (
	layoutTime = "15:04:05" // Định dạng HH:MM:SS
)

// TimeOnly là kiểu tùy chỉnh chỉ lưu giờ (HH:MM:SS)
type TimeOnly struct {
	time.Time
}

// UnmarshalJSON để parse giá trị từ JSON
func (t *TimeOnly) UnmarshalJSON(b []byte) error {
	strInput := strings.Trim(string(b), `"`) // Loại bỏ dấu ngoặc kép

	parsedTime, err := time.Parse(layoutTime, strInput)
	if err != nil {
		return errors.New("invalid time format, expected HH:MM:SS")
	}

	t.Time = parsedTime
	return nil
}

// MarshalJSON để định dạng lại giá trị khi trả về JSON
func (t TimeOnly) MarshalJSON() ([]byte, error) {
	return []byte(`"` + t.Time.Format(layoutTime) + `"`), nil
}

// Scan giúp GORM đọc giá trị từ cơ sở dữ liệu
func (t *TimeOnly) Scan(value interface{}) error {
	if value == nil {
		t.Time = time.Time{}
		return nil
	}

	switch v := value.(type) {
	case time.Time:
		t.Time = v
		return nil
	case []byte:
		parsed, err := time.Parse(layoutTime, string(v))
		if err != nil {
			return err
		}
		t.Time = parsed
		return nil
	case string:
		parsed, err := time.Parse(layoutTime, v)
		if err != nil {
			return err
		}
		t.Time = parsed
		return nil
	default:
		return errors.New("invalid type for TimeOnly")
	}
}

// Value giúp GORM lưu giá trị vào cơ sở dữ liệu
func (t TimeOnly) Value() (driver.Value, error) {
	if t.IsZero() {
		return nil, nil
	}
	return t.Format(layoutTime), nil
}
