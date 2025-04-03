package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
)

type CourseRepo struct{}

func NewCourseRepo() *CourseRepo {
	return &CourseRepo{}
}

func (cr *CourseRepo) CreateCourseRepo(course models.Course) error {
	tx := global.Mdb.Begin()

	if err := tx.Create(&course).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu course: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

func (cr *CourseRepo) UpdateCourseRepo(course models.Course) error {
	tx := global.Mdb.Begin()

	var existingCourse models.Course
	if err := tx.First(&existingCourse, course.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm course: %v", err)
	}

	course.CreatedAt = existingCourse.CreatedAt
	if err := tx.Save(&course).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật course: %v", err)
	}

	tx.Commit()
	return nil
}

func (cr *CourseRepo) GetAllCoursesRepo(paging util.Paging) ([]models.Course, int64, error) {
	var courses []models.Course
	var total int64

	if err := global.Mdb.Model(&models.Course{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy tổng số Course: %v", err)
	}

	offset := (paging.Page - 1) * paging.Limit
	if err := global.Mdb.Limit(paging.Limit).Offset(offset).Find(&courses).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy danh sách course: %v", err)
	}
	return courses, total, nil
}

func (cr *CourseRepo) GetCourseByIDRepo(id uint) (*models.Course, error) {
	var course models.Course
	if err := global.Mdb.First(&course, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy course theo ID: %v", err)
	}
	return &course, nil
}

func (cr *CourseRepo) DeleteCourseRepo(id uint) error {
	tx := global.Mdb.Begin()

	var course models.Course
	if err := tx.First(&course, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm course để xóa: %v", err)
	}

	if err := tx.Delete(&course).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa course: %v", err)
	}

	tx.Commit()
	return nil
}
