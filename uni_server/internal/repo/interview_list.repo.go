package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
)

type InterviewListRepo struct{}

func NewInterviewListRepo() *InterviewListRepo {
	return &InterviewListRepo{}
}

// 📌 Tạo mới một bản ghi phỏng vấn
func (repo *InterviewListRepo) CreateInterview(interview models.InterviewList) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&interview).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu thông tin phỏng vấn: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

// 📌 Cập nhật thông tin phỏng vấn
func (repo *InterviewListRepo) UpdateInterview(interview models.InterviewList) error {
	tx := global.Mdb.Begin()

	var existingInterview models.InterviewList
	if err := tx.First(&existingInterview, interview.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm thông tin phỏng vấn: %v", err)
	}

	// Giữ nguyên thời gian tạo
	interview.CreatedAt = existingInterview.CreatedAt
	if err := tx.Save(&interview).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật thông tin phỏng vấn: %v", err)
	}
	tx.Commit()
	return nil
}

// 📌 Lấy danh sách phỏng vấn có phân trang
func (repo *InterviewListRepo) GetAllInterviews() ([]models.InterviewList, error) {
	var interviews []models.InterviewList
	if err := global.Mdb.Preload("Human").Find(&interviews).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách phỏng vấn: %v", err)
	}
	return interviews, nil
}

// 📌 Lấy thông tin chi tiết của một cuộc phỏng vấn theo ID
func (repo *InterviewListRepo) GetInterviewByID(id uint) (*models.InterviewList, error) {
	var interview models.InterviewList
	if err := global.Mdb.Preload("Human").First(&interview, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy thông tin phỏng vấn theo ID: %v", err)
	}
	return &interview, nil
}

// 📌 Xóa một bản ghi phỏng vấn theo ID
func (repo *InterviewListRepo) DeleteInterview(id uint) error {
	tx := global.Mdb.Begin()

	var interview models.InterviewList
	if err := tx.First(&interview, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm thông tin phỏng vấn để xóa: %v", err)
	}

	if err := tx.Delete(&interview).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa thông tin phỏng vấn: %v", err)
	}

	tx.Commit()
	return nil
}
