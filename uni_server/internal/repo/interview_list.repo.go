package repo

import (
	"fmt"
	"time"
	"uni_server/global"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
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
func (repo *InterviewListRepo) GetInterviewByOffice(id uint) ([]models.InterviewList, error) {
	var interview []models.InterviewList
	if err := global.Mdb.
		Debug().
		Joins("JOIN go_db_human ON go_db_human.id = go_db_interview_list.id_human").
		Where("go_db_human.id_office = ?", id).
		Preload("Human").
		Find(&interview).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy thông tin phỏng vấn theo office: %v", err)
	}
	return interview, nil
}

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

func (repo *InterviewListRepo) CountInterviewhuman(id int, year int, month int) ([]dto.InterviewCount, error) {
	var count []dto.InterviewCount

	tx := global.Mdb.Table("go_db_interview_list AS i").
		Select("i.id_human, h.name, COUNT(*) AS total").
		Joins("JOIN go_db_human h ON i.id_human = h.id").
		Where("h.id_office = ? AND YEAR(i.date_interview) = ? AND MONTH(i.date_interview) = ?", id, year, month).
		Group("i.id_human, h.name").
		Scan(&count)

	if tx.Error != nil {
		return nil, fmt.Errorf("lỗi truy vấn dữ liệu: %v", tx.Error)
	}

	return count, nil
}

func (repo *InterviewListRepo) CountInterviewResult(id int, year int, month int) ([]dto.CountInterviewResult, error) {
	var count []dto.CountInterviewResult

	tx := global.Mdb.Table("go_db_interview_list AS i").
		Select("i.result, COUNT(*) AS count"). // alias phải trùng với struct field!
		Joins("JOIN go_db_human h ON i.id_human = h.id").
		Where("h.id_office = ? AND YEAR(i.date_interview) = ? AND MONTH(i.date_interview) = ?", id, year, month).
		Group("i.result").
		Scan(&count)

	if tx.Error != nil {
		return nil, fmt.Errorf("lỗi truy vấn dữ liệu: %v", tx.Error)
	}
	return count, nil
}

func (repo *InterviewListRepo) CountInterviewResultByDate(subIDs []int, date util.DateOnly) ([]dto.InterouputDate, error) {
	var count []dto.InterouputDate

	// Tính thời gian bắt đầu và kết thúc trong ngày
	start := date.Time.Truncate(24 * time.Hour)
	end := start.Add(24*time.Hour - time.Second)

	// Format lại theo chuẩn SQL DATETIME
	startStr := start.Format("2006-01-02 15:04:05")
	endStr := end.Format("2006-01-02 15:04:05")

	fmt.Println("id:", subIDs)
	fmt.Println("start:", startStr)
	fmt.Println("end:", endStr)

	tx := global.Mdb.Table("go_db_interview_list AS i").
		Select("i.id_human, COUNT(*) AS count").
		Where("i.id_human IN ? AND i.date_interview BETWEEN ? AND ?", subIDs, startStr, endStr).
		Group("i.id_human").
		Scan(&count)

	if tx.Error != nil {
		return nil, fmt.Errorf("lỗi truy vấn dữ liệu: %v", tx.Error)
	}

	fmt.Println("count:", count)
	return count, nil
}
