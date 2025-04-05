package repo

import (
	"errors"
	"fmt"
	"log"
	"uni_server/global"
	"uni_server/internal/models"

	"gorm.io/gorm"
)

type BillRepo struct {
}

func NewBillRepo() *BillRepo {
	return &BillRepo{}
}

func (br *BillRepo) CreateBillRepo(bill models.Bill, student models.Student, imgBill []models.BillImg) error {
	tx := global.Mdb.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	data, err := NewStudentRepo().GettudentByPhoneRepo(student.PhoneNumber)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lấy thông tin học viên: %v", err)
	}

	if data.ID > 0 {
		if data.Name != bill.Name || data.Email != bill.Email {
			tx.Rollback()
			return fmt.Errorf("số điện thoại này đã có người sử dụng để đăng ký")
		}

		existingCourses := make(map[uint]bool, len(data.Courses))
		for _, c := range data.Courses {
			existingCourses[c.ID] = true
		}

		var newCourses []models.Course
		for _, c := range bill.Courses {
			if !existingCourses[c.ID] {
				newCourses = append(newCourses, c)
			}
		}

		if len(newCourses) > 0 {
			data.TotalTuition += bill.TotalTuition
			if err := tx.Save(&data).Error; err != nil {
				tx.Rollback()
				return fmt.Errorf("lỗi khi cập nhật tổng học phí: %v", err)
			}

			if err := tx.Model(&data).Association("Courses").Append(newCourses); err != nil {
				tx.Rollback()
				return fmt.Errorf("lỗi khi thêm khóa học mới: %v", err)
			}
		}
	} else {
		if err := tx.Create(&student).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi tạo hồ sơ học viên: %v", err)
		}
	}

	if err := tx.Create(&bill).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tạo hóa đơn: %v", err)
	}

	if len(imgBill) > 0 {
		for i := range imgBill {
			imgBill[i].IDBill = int(bill.ID)
		}
		if err := tx.Create(&imgBill).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi tạo ảnh hóa đơn: %v", err)
		}
	}

	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}

	return nil
}

func (br *BillRepo) GetAllBillRepo() ([]models.Bill, error) {
	var bill []models.Bill
	if err := global.Mdb.Preload("Human").Preload("Office").Preload("CustomerSource").Preload("PaymentForm").Preload("Courses").Find(&bill).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy danh sách bill: %v", err)
	}

	return bill, nil
}

func (br *BillRepo) GetBillByIdRepo(id uint) (models.Bill, []models.BillImg, error) {
	var bill models.Bill
	var billImg []models.BillImg

	err := global.Mdb.Preload("Human").Preload("Office").Preload("CustomerSource").Preload("PaymentForm").Preload("Courses").First(&bill, id).Error
	if err != nil {
		return models.Bill{}, nil, fmt.Errorf("lỗi khi lấy bill theo ID: %v", err)
	}

	err = global.Mdb.Preload("Bill").Where("bill_id = ?", id).Find(&billImg).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		log.Printf("lỗi truy vấn billimg với bill_id %d: %v", id, err)
		return bill, nil, fmt.Errorf("lỗi truy vấn billimg: %v", err)
	}
	return bill, billImg, nil
}

func (br *BillRepo) UpdateBillRepo(bill models.Bill, billImg []models.BillImg, student models.Student) error {
	tx := global.Mdb.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	var existingBill models.Bill
	if err := tx.First(&existingBill, bill.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lấy bill theo ID: %v", err)
	}
	bill.CreatedAt = existingBill.CreatedAt

	if err := tx.Exec("DELETE FROM go_bill_courses WHERE bill_id = ?", bill.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa Courses bill cũ: %v", err)
	}

	if err := tx.Save(&bill).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật bill: %v", err)
	}

	if student.ID > 0 {
		if err := tx.Exec("DELETE FROM go_student_courses WHERE student_id = ?", student.ID).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi xóa Courses student cũ: %v", err)
		}
		if err := tx.Save(&student).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi cập nhật student: %v", err)
		}
	}

	if len(billImg) > 0 {
		if err := tx.Where("bill_id = ?", bill.ID).Delete(&models.BillImg{}).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi xóa ảnh hóa đơn: %v", err)
		}

		for i := range billImg {
			billImg[i].IDBill = int(bill.ID)
		}

		if err := tx.Create(&billImg).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("lỗi khi tạo ảnh hóa đơn: %v", err)
		}
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}

	return nil
}
