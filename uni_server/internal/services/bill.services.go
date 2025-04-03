package services

import (
	"fmt"
	"sync"
	"uni_server/global"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"
)

type BillServices struct {
	BillRepo    *repo.BillRepo
	StudentRepo *repo.StudentRepo
}

func NewBillServices() *BillServices {
	return &BillServices{
		BillRepo:    repo.NewBillRepo(),
		StudentRepo: repo.NewStudentRepo(),
	}
}

func (bs *BillServices) CreateBillService(request dto.BillRequest) error {
	if request.Bill.PayMoney > request.Bill.TotalTuition {
		return fmt.Errorf("tiền đóng lớn hơn tổng tiền, vui lòng kiểm tra lại")
	}
	var imgBill []models.BillImg
	var wg sync.WaitGroup
	errChan := make(chan error, len(request.BillImgs))
	imgChan := make(chan models.BillImg, len(request.BillImgs))

	// Xử lý ảnh hóa đơn (không thay đổi)
	for _, fileHeader := range request.BillImgs {
		wg.Add(1)
		go func(f models.BillImg) {
			defer wg.Done()
			decoded, err := util.DecodeBase64Image(f.Img)
			if err != nil {
				errChan <- fmt.Errorf("decode lỗi: %v", err)
				return
			}
			imgURL, err := util.UpLoadFile(decoded)
			if err != nil {
				errChan <- fmt.Errorf("upload lỗi: %v", err)
				return
			}
			imgChan <- models.BillImg{Img: imgURL}
		}(fileHeader)
	}

	go func() {
		wg.Wait()
		close(errChan)
		close(imgChan)
	}()

	for range request.BillImgs {
		select {
		case img := <-imgChan:
			imgBill = append(imgBill, img)
		case err := <-errChan:
			return err
		}
	}

	// Tạo Student
	student := models.Student{
		IDHuman:          request.Bill.IDHuman,
		Name:             request.Bill.Name,
		RegistrationDate: request.Bill.RegistrationDate,
		PhoneNumber:      request.Bill.PhoneNumber,
		BirthDay:         request.Bill.BirthDay,
		TotalTuition:     request.Bill.TotalTuition,
		IDOffice:         request.Bill.IDOffice,
		Email:            request.Bill.Email,
		Courses:          request.Bill.Courses, // ✅ Lưu courses vào student
	}

	// Tạo Bill
	bill := request.Bill
	bill.Courses = request.Bill.Courses // ✅ Gán danh sách courses vào Bill

	err := bs.BillRepo.CreateBillRepo(bill, student, imgBill)
	if err != nil {
		return err
	}
	return nil
}

func (bs *BillServices) GetAllBillServies(paging util.Paging) ([]models.Bill, int64, error) {
	return bs.BillRepo.GetAllBillRepo(paging)
}

func (bs *BillServices) GetBillByIDService(id uint) (models.Bill, []models.BillImg, error) {
	return bs.BillRepo.GetBillByIdRepo(id)
}

func (bs *BillServices) UpdateBillService(request dto.BillRequest) error {
	tx := global.Mdb.Begin()

	if tx.Error != nil {
		return fmt.Errorf("lỗi khi bắt đầu transaction: %v", tx.Error)
	}

	existingstudent, err := bs.StudentRepo.GettudentByPhoneRepo(request.Bill.PhoneNumber)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi tìm kiếm student: %v", err)
	}

	existingstudent.IDHuman = request.Bill.IDHuman
	existingstudent.Name = request.Bill.Name
	existingstudent.RegistrationDate = request.Bill.RegistrationDate
	existingstudent.PhoneNumber = request.Bill.PhoneNumber
	existingstudent.BirthDay = request.Bill.BirthDay
	existingstudent.TotalTuition = request.Bill.TotalTuition
	existingstudent.IDOffice = request.Bill.IDOffice
	existingstudent.Email = request.Bill.Email
	existingstudent.Courses = request.Bill.Courses

	var billImg []models.BillImg
	var wg sync.WaitGroup
	var mu sync.Mutex
	errChan := make(chan error, len(request.BillImgs))

	for _, fileHeader := range request.BillImgs {
		wg.Add(1)
		go func(f models.BillImg) {
			defer wg.Done()
			decoded, err := util.DecodeBase64Image(f.Img)
			if err != nil {
				errChan <- fmt.Errorf("decode lỗi: %v", err)
				return
			}
			imgURL, err := util.UpLoadFile(decoded)
			if err != nil {
				errChan <- fmt.Errorf("upload lỗi: %v", err)
				return
			}

			mu.Lock()
			defer mu.Unlock()
			billImg = append(billImg, models.BillImg{
				IDBill: int(request.Bill.ID),
				Img:    imgURL,
			})
		}(fileHeader)
	}

	go func() {
		wg.Wait()
		close(errChan)
	}()

	var errList []error
	for err := range errChan {
		errList = append(errList, err)
	}

	if len(errList) > 0 {
		tx.Rollback()
		return fmt.Errorf("lỗi: %v", errList)
	}

	err = bs.BillRepo.UpdateBillRepo(request.Bill, billImg, existingstudent)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi database: %v", err)
	}

	tx.Commit()
	return nil
}
