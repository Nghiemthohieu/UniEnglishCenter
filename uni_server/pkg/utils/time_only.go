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

type TimeOnly struct {
	time.Time
}

// GormDataType giúp GORM hiểu đây là kiểu TIME
func (TimeOnly) GormDataType() string {
	return "time"
}

func (t *TimeOnly) UnmarshalJSON(b []byte) error {
	strInput := strings.Trim(string(b), `"`)
	parsedTime, err := time.Parse(layoutTime, strInput)
	if err != nil {
		return errors.New("invalid time format, expected HH:MM:SS")
	}
	t.Time = parsedTime
	return nil
}

func (t TimeOnly) MarshalJSON() ([]byte, error) {
	return []byte(`"` + t.Time.Format(layoutTime) + `"`), nil
}

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

func (t TimeOnly) Value() (driver.Value, error) {
	if t.IsZero() {
		return nil, nil
	}
	return t.Format(layoutTime), nil
}