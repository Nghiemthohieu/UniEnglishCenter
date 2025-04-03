package dto

import (
	"uni_server/internal/models"
)

type HumanRequest struct {
	Human    models.Human      `json:"human"`
	HumanNIC []models.HumanNIC `json:"human_nic"`
}
