package util

import "time"

func NewTimeOnlyFromTime(t time.Time) TimeOnly {
	return TimeOnly{Time: time.Date(0, 1, 1, t.Hour(), t.Minute(), t.Second(), 0, time.UTC)}
}
