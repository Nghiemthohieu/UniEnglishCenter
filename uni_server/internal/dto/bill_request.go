package dto

import "uni_server/internal/models"

type BillRequest struct {
	Bill     models.Bill      `json:"bill"`
	BillImgs []models.BillImg `json:"bill_imgs"`
}
