package services

import (
	"fmt"
	"sync"
	"uni_server/global"
	"uni_server/internal/dto"
	"uni_server/internal/models"
	"uni_server/internal/repo"
	util "uni_server/pkg/utils"

	"gorm.io/gorm"
)

type HumanService struct {
	HumanRepo *repo.HumanRepo
}

func NewHumanService() *HumanService {
	return &HumanService{
		HumanRepo: repo.NewHumanRepo(),
	}
}

func (hs *HumanService) CreateHumanService(request dto.HumanRequest) (models.Human, []models.HumanNIC, error) {
	human := models.Human{
		Name:        request.Human.Name,
		IDPosition:  request.Human.IDPosition,
		IDOffice:    request.Human.IDOffice,
		IDStatus:    request.Human.IDStatus,
		StartWord:   request.Human.StartWord,
		Hometown:    request.Human.Hometown,
		PhoneNumber: request.Human.PhoneNumber,
		BirthDay:    request.Human.BirthDay,
		Gender:      request.Human.Gender,
		Email:       request.Human.Email,
		Team:        request.Human.Team,
	}

	var humanNICs []models.HumanNIC
	var wg sync.WaitGroup
	errChan := make(chan error, len(request.HumanNIC))
	imgChan := make(chan models.HumanNIC, len(request.HumanNIC))

	// Upload ảnh song song với WaitGroup
	for _, fileHeader := range request.HumanNIC {
		wg.Add(1)
		go func(f models.HumanNIC) {
			defer wg.Done()
			decoded, err := util.DecodeBase64Image(f.NIC)
			if err != nil {
				errChan <- fmt.Errorf("decode lỗi: %v", err)
				return
			}
			imgURL, err := util.UpLoadFile(decoded)
			if err != nil {
				errChan <- fmt.Errorf("upload lỗi: %v", err)
				return
			}
			imgChan <- models.HumanNIC{NIC: imgURL}
		}(fileHeader)
	}

	// Goroutine chờ xử lý xong
	go func() {
		wg.Wait()
		close(errChan)
		close(imgChan)
	}()

	// Nhận kết quả upload
	for range request.HumanNIC {
		select {
		case err := <-errChan:
			return human, nil, err
		case img := <-imgChan:
			humanNICs = append(humanNICs, img)
		}
	}

	// Lưu database
	human, humanNICs, err := hs.HumanRepo.CreateHumanRepo(human, humanNICs)
	if err != nil {
		return human, nil, err
	}

	// Gửi email không blocking
	go util.SendMail("hieunghiem2712@gmail.com", "Ngôi nhà Uni English Center", "Chào mừng bạn đến với ngôi nhà của chúng tôi")

	return human, humanNICs, nil
}

// Lấy một Human theo ID
func (hs *HumanService) GetHumanByIDService(id uint) (models.Human, []models.HumanNIC, error) {
	return hs.HumanRepo.GetHumanByIDRepo(id)
}

// Lấy tất cả Humans
func (hs *HumanService) GetAllHumansService() ([]models.Human, error) {
	return hs.HumanRepo.GetAllHumansRepo()
}

// Cập nhật thông tin Human
func (hs *HumanService) UpdateHumanService(request dto.HumanRequest) error {
	// Bắt đầu transaction
	tx := global.Mdb.Begin()
	if tx.Error != nil {
		return fmt.Errorf("lỗi khi bắt đầu transaction: %v", tx.Error)
	}

	// Tạo đối tượng Human từ request
	human := models.Human{
		Model:       gorm.Model{ID: request.Human.ID},
		Name:        request.Human.Name,
		IDPosition:  request.Human.IDPosition,
		IDOffice:    request.Human.IDOffice,
		IDStatus:    request.Human.IDStatus,
		StartWord:   request.Human.StartWord,
		Hometown:    request.Human.Hometown,
		PhoneNumber: request.Human.PhoneNumber,
		BirthDay:    request.Human.BirthDay,
		Gender:      request.Human.Gender,
		Email:       request.Human.Email,
		Team:        request.Human.Team,
	}

	// Xử lý upload ảnh song song
	var humanNICs []models.HumanNIC
	var wg sync.WaitGroup
	var mu sync.Mutex
	errChan := make(chan error, len(request.HumanNIC))
	imgChan := make(chan models.HumanNIC, len(request.HumanNIC))

	// Upload ảnh trong goroutines
	for _, fileHeader := range request.HumanNIC {
		wg.Add(1)
		go func(f models.HumanNIC) {
			defer wg.Done()

			decoded, err := util.DecodeBase64Image(f.NIC)
			if err != nil {
				errChan <- fmt.Errorf("decode lỗi: %v", err)
				return
			}

			imgURL, err := util.UpLoadFile(decoded)
			if err != nil {
				errChan <- fmt.Errorf("upload lỗi: %v", err)
				return
			}

			// Ghi vào slice trong môi trường concurrent-safe
			mu.Lock()
			humanNICs = append(humanNICs, models.HumanNIC{
				IDHuman: int(request.Human.ID), // Gán IDHuman
				NIC:     imgURL,
			})
			mu.Unlock()
		}(fileHeader)
	}

	// Goroutine chờ tất cả các quá trình upload hoàn thành
	go func() {
		wg.Wait()
		close(errChan)
		close(imgChan)
	}()

	// Xử lý lỗi nếu có
	var errList []error
	for err := range errChan {
		errList = append(errList, err)
	}

	if len(errList) > 0 {
		tx.Rollback()
		return fmt.Errorf("lỗi: %v", errList)
	}

	err := hs.HumanRepo.UpdateHumanRepo(human, humanNICs)

	if err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi database: %v", err)
	}

	// Commit transaction nếu không có lỗi
	tx.Commit()
	return nil
}

// Xóa Human theo ID
func (hs *HumanService) DeleteHumanService(id int) error {
	return hs.HumanRepo.DeleteHumanRepo(id)
}

func GetAllSubordinateIDs(humanID int) ([]int, error) {
	var result []int
	queue := []int{humanID}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		result = append(result, current)

		var subIDs []int
		err := global.Mdb.Table("go_team_human AS t").
			Select("t.human_id").
			Joins("JOIN go_db_human h ON t.human_id = h.id").
			Where("t.team_id = ? AND h.deleted_at IS NULL", current).
			Scan(&subIDs).Error
		if err != nil {
			return nil, err
		}

		queue = append(queue, subIDs...)
	}

	// Bỏ người gốc nếu không cần
	return result[0:], nil
}

func (hs *HumanService) CountAllSubordinatesExcludeSelf(humanID int) (int, error) {
	subIDs, err := GetAllSubordinateIDs(humanID)
	fmt.Printf("id: %v", subIDs)
	if err != nil {
		return 0, err
	}
	if len(subIDs) > 0 {
		return len(subIDs) - 1, nil
	}
	return 0, nil
}
