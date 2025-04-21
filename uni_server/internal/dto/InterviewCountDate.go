package dto

import util "uni_server/pkg/utils"

type InterviewCountDate struct {
	ID   int           `json:"id"`   // ID của người nhân sự cấp cao
	Date util.DateOnly `json:"date"` // Ngày cần lọc
}

type InterouputDate struct {
	IdHuman int `json:"id_human"`
	Count   int `json:"count"`
}
