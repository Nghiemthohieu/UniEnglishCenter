package repo

import (
	"uni_server/global"
	"uni_server/internal/models"
)

type StudentRepo struct{}

func NewStudentRepo() *StudentRepo {
	return &StudentRepo{}
}

func (sr *StudentRepo) GettudentByPhoneRepo(phone string) (models.Student, error) {
	var student models.Student

	err := global.Mdb.Where("phone_number = ?", phone).Find(&student).Error
	if err != nil {
		return student, err
	}
	return student, nil
}


