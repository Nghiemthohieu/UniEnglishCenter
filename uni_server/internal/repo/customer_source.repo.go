package repo

import (
	"fmt"
	"uni_server/global"
	"uni_server/internal/models"
	util "uni_server/pkg/utils"
)

type CustomerSourceRepo struct{}

func NewCustomerSourceRepo() *CustomerSourceRepo {
	return &CustomerSourceRepo{}
}

func (csr *CustomerSourceRepo) CreateCustomerSourceRepo(source models.CustomerSource) error {
	tx := global.Mdb.Begin()
	if err := tx.Create(&source).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi lưu customer source: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("lỗi khi commit transaction: %v", err)
	}
	return nil
}

func (csr *CustomerSourceRepo) UpdateCustomerSourceRepo(source models.CustomerSource) error {
	tx := global.Mdb.Begin()

	var existingSource models.CustomerSource
	if err := tx.First(&existingSource, source.ID).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm customer source: %v", err)
	}

	source.CreatedAt = existingSource.CreatedAt
	if err := tx.Save(&source).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi cập nhật customer source: %v", err)
	}

	tx.Commit()
	return nil
}

func (csr *CustomerSourceRepo) GetAllCustomerSourcesRepo(paging util.Paging) ([]models.CustomerSource, int64, error) {
	var sources []models.CustomerSource
	var total int64

	if err := global.Mdb.Model(&models.CustomerSource{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy tổng số Customer Source: %v", err)
	}
	offset := (paging.Page - 1) * paging.Limit
	if err := global.Mdb.Limit(paging.Limit).Offset(offset).Find(&sources).Error; err != nil {
		return nil, 0, fmt.Errorf("lỗi khi lấy danh sách customer source: %v", err)
	}
	return sources, total, nil
}

func (csr *CustomerSourceRepo) GetCustomerSourceByIDRepo(id uint) (*models.CustomerSource, error) {
	var source models.CustomerSource
	if err := global.Mdb.First(&source, id).Error; err != nil {
		return nil, fmt.Errorf("lỗi khi lấy customer source theo ID: %v", err)
	}
	return &source, nil
}

func (csr *CustomerSourceRepo) DeleteCustomerSourceRepo(id uint) error {
	tx := global.Mdb.Begin()

	var source models.CustomerSource
	if err := tx.First(&source, id).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi tìm customer source để xóa: %v", err)
	}

	if err := tx.Delete(&source).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("lỗi khi xóa customer source: %v", err)
	}

	tx.Commit()
	return nil
}
