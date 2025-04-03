package initialize

import (
	"fmt"
	"time"
	"uni_server/global"
	"uni_server/internal/models"

	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func CheckErrerPanic(err error, errString string) {
	if err != nil {
		global.Logger.Error(errString, zap.Error(err))
		panic(err)
	}
}

func InitMySQL() {
	m := global.Config.Mysql

	dsn := "%s:%s@tcp(%s:%v)/%s?charset=utf8mb4&parseTime=True&loc=Local"
	var s = fmt.Sprintf(dsn, m.UserName, m.PassWord, m.Host, m.Port, m.Dbname)
	db, err := gorm.Open(mysql.Open(s), &gorm.Config{})
	CheckErrerPanic(err, "Init MySQL initialized Error")
	global.Logger.Info("Initialized MySQL Successfully")
	global.Mdb = db

	SetPool()
	migrateTables()
}

func SetPool() {
	m := global.Config.Mysql
	sqlDb, err := global.Mdb.DB()
	if err != nil {
		fmt.Printf("mysql error: %s::", err)
	}

	sqlDb.SetConnMaxIdleTime(time.Duration(m.MaxIdleConns))
	sqlDb.SetMaxOpenConns(m.MaxOpenConns)
	sqlDb.SetConnMaxLifetime(time.Duration(m.ConnMaxLifetime))
}

func migrateTables() {
	err := global.Mdb.AutoMigrate(
		&models.Human{},
		&models.BaseSalary{},
		&models.Bill{},
		&models.BillImg{},
		&models.Course{},
		&models.CustomerSource{},
		&models.DutySchedule{},
		&models.HumanNIC{},
		&models.InterviewList{},
		&models.Office{},
		&models.PaymentForm{},
		&models.Position{},
		&models.PotentialCustomerList{},
		&models.Shift{},
		&models.SoftSalary{},
		&models.Status{},
		&models.Student{},
		&models.Team{},
		&models.TimeKeeping{},
		&models.WorkCalendar{},
		&models.Salary{},
		&models.User{},
	)

	if err != nil {
		fmt.Printf("migrate tables error: %s::", err)
	}
}
