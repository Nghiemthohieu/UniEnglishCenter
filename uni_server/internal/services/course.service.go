package services

import (
	"uni_server/internal/models"
	"uni_server/internal/repo"
)

type CourseServices struct {
	CourseRepo *repo.CourseRepo
}

func NewCourseService() *CourseServices {
	return &CourseServices{
		CourseRepo: repo.NewCourseRepo(),
	}
}

func (cs *CourseServices) CreateCourseService(request models.Course) error {
	return cs.CourseRepo.CreateCourseRepo(request)
}

func (cs *CourseServices) UpdateCourseService(request models.Course) error {
	return cs.CourseRepo.UpdateCourseRepo(request)
}

func (cs *CourseServices) GetAllCoursesService() ([]models.Course, error) {
	return cs.CourseRepo.GetAllCoursesRepo()
}

func (cs *CourseServices) GetCourseByIdService(id uint) (*models.Course, error) {
	return cs.CourseRepo.GetCourseByIDRepo(id)
}

func (cs *CourseServices) DeleteCourseService(id uint) error {
	return cs.CourseRepo.DeleteCourseRepo(id)
}
