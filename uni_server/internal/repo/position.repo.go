package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type PositionRepo struct{}

func NewPositionRepo() *PositionRepo {
	return &PositionRepo{}
}

// 📌 Tạo mới một vị trí công việc
func (repo *PositionRepo) CreatePosition(position models.Position) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&position).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu vị trí công việc: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin vị trí công việc
func (repo *PositionRepo) UpdatePosition(position models.Position) error {
	tx := global.Mdb.Begin()

	var existingPosition models.Position
	if err := tx.First(&existingPosition, position.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm vị trí công việc: %v", err)
	}

	// Giữ nguyên thời gian tạo
	position.CreatedAt = existingPosition.CreatedAt
	if err := tx.Save(&position).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật vị trí công việc: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách vị trí công việc có phân trang
func (repo *PositionRepo) GetAllPositions() ([]models.Position, error) {
	var positions []models.Position

	if err := global.Mdb.Find(&positions).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách vị trí công việc: %v", err)
	}
	return positions, nil
}

// 📌 Lấy thông tin chi tiết của một vị trí công việc theo ID
func (repo *PositionRepo) GetPositionByID(id uint) (*models.Position, error) {
	var position models.Position
	if err := global.Mdb.First(&position, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy vị trí công việc theo ID: %v", err)
	}
	return &position, nil
}

// 📌 Xóa một vị trí công việc theo ID
func (repo *PositionRepo) DeletePosition(id uint) error {
	tx := global.Mdb.Begin()

	var position models.Position
	if err := tx.First(&position, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm vị trí công việc để xóa: %v", err)
	}

	if err := tx.Delete(&position).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa vị trí công việc: %v", err)
	}

	tx.Commit()
	return nil
}
