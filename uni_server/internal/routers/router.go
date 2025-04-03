package routers

import (
	"fmt"
	"uni_server/internal/controller"
	"uni_server/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func AA() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("Before --> AA")
		c.Next()
		fmt.Println("Alter --> AA")
	}
}
func BB() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("Before --> BB")
		c.Next()
		fmt.Println("Alter --> BB")
	}
}

func CC(c *gin.Context) {
	fmt.Println("Before --> CC")
	c.Next()
	fmt.Println("Alter --> CC")
}
func NewRouter() *gin.Engine {
	r := gin.Default()

	r.Use(middlewares.LoggerMiddle(), middlewares.CorsMiddleware(), middlewares.RateLimitMiddleware())

	v1 := r.Group("/api")
	{
		personnel := v1.Group("/human_resources")
		{
			personnel.POST("", controller.NewHumanController().CreateHumanController())
			personnel.GET("/:id", controller.NewHumanController().GetHumanController())
			personnel.GET("", controller.NewHumanController().GetAllHumansController())
			personnel.PUT("", controller.NewHumanController().UpdateHumanController())
			personnel.DELETE("/:id", controller.NewHumanController().DeleteHumanController())
		}
		bill := v1.Group("/bill")
		{
			bill.POST("", controller.NewBillController().CreateBillController())
			bill.GET("", controller.NewBillController().GetAllBillController())
			bill.GET("/:id", controller.NewBillController().GetBillByIdController())
			bill.PUT("", controller.NewBillController().UpdateBillController())
			bill.DELETE("/:id")
		}
		base_salary := v1.Group("/base_salary")
		{
			base_salary.POST("", controller.NewBaseSalaryController().CreateBaseSalaryController())
			base_salary.GET("", controller.NewBaseSalaryController().GetAllBaseSalaryController())
			base_salary.GET("/:id", controller.NewBaseSalaryController().GetBaseSalaryByIdController())
			base_salary.PUT("", controller.NewBaseSalaryController().UpdateBaseSalaryController())
			base_salary.DELETE("/:id", controller.NewBaseSalaryController().DeleteBaseSalaryController())
		}
		course := v1.Group("/course")
		{
			course.POST("", controller.NewCourseController().CreateCourseController())
			course.GET("", controller.NewCourseController().GetAllCoursesController())
			course.GET("/:id", controller.NewCourseController().GetCourseByIdController())
			course.PUT("", controller.NewCourseController().UpdateCourseController())
			course.DELETE("/:id", controller.NewCourseController().DeleteCourseController())
		}
		CustomerSource := v1.Group("/customer_source")
		{
			CustomerSource.POST("", controller.NewCustomerSourceController().CreateCustomerSourceController())
			CustomerSource.GET("", controller.NewCustomerSourceController().GetAllCustomerSourcesController())
			CustomerSource.GET("/:id", controller.NewCustomerSourceController().GetCustomerSourceByIdController())
			CustomerSource.PUT("", controller.NewCustomerSourceController().UpdateCustomerSourceController())
			CustomerSource.DELETE("/:id", controller.NewCustomerSourceController().DeleteCustomerSourceController())
		}
		DutySchedule := v1.Group("/duty_schudule")
		{
			DutySchedule.POST("", controller.NewDutyScheduleController().CreateDutySchedule())
			DutySchedule.GET("", controller.NewDutyScheduleController().GetAllDutySchedules())
			DutySchedule.GET("/:id", controller.NewDutyScheduleController().GetDutyScheduleByID())
			DutySchedule.PUT("", controller.NewDutyScheduleController().UpdateDutySchedule())
			DutySchedule.DELETE("/:id", controller.NewDutyScheduleController().DeleteDutySchedule())
		}
		interview_list := v1.Group("/interview_list")
		{
			interview_list.POST("", controller.NewInterviewListController().CreateInterview())
			interview_list.GET("", controller.NewInterviewListController().GetAllInterviews())
			interview_list.GET("/:id", controller.NewInterviewListController().GetInterviewByID())
			interview_list.PUT("", controller.NewInterviewListController().UpdateInterview())
			interview_list.DELETE("/:id", controller.NewInterviewListController().DeleteInterview())
		}
		office := v1.Group("/Office")
		{
			office.POST("", controller.NewOfficeController().CreateOffice())
			office.GET("", controller.NewOfficeController().GetAllOffices())
			office.GET("/:id", controller.NewOfficeController().GetOfficeByID())
			office.PUT("", controller.NewOfficeController().UpdateOffice())
			office.DELETE("/:id", controller.NewOfficeController().DeleteOffice())
		}
		paymentForm := v1.Group("/payment_form")
		{
			paymentForm.POST("", controller.NewPaymentFormController().CreatePaymentForm())
			paymentForm.GET("", controller.NewPaymentFormController().GetAllPaymentForms())
			paymentForm.GET("/:id", controller.NewPaymentFormController().GetPaymentFormByID())
			paymentForm.PUT("", controller.NewPaymentFormController().UpdatePaymentForm())
			paymentForm.DELETE("/:id", controller.NewPaymentFormController().DeletePaymentForm())
		}
		position := v1.Group("/position")
		{
			position.POST("", controller.NewPositionController().CreatePosition())
			position.GET("", controller.NewPositionController().GetAllPositions())
			position.GET("/:id", controller.NewPositionController().GetPositionByID())
			position.PUT("", controller.NewPositionController().UpdatePosition())
			position.DELETE("/:id", controller.NewPositionController().DeletePosition())
		}
		shift := v1.Group("/shift")
		{
			shift.POST("", controller.NewShiftController().CreateShift())
			shift.GET("", controller.NewShiftController().GetAllShifts())
			shift.GET("/:id", controller.NewShiftController().GetShiftByID())
			shift.PUT("", controller.NewShiftController().UpdateShift())
			shift.DELETE("/:id", controller.NewShiftController().DeleteShift())
		}
		soft_salary := v1.Group("/soft_salary")
		{
			soft_salary.POST("", controller.NewSoftSalaryController().CreateSoftSalary())
			soft_salary.GET("", controller.NewSoftSalaryController().GetAllSoftSalaries())
			soft_salary.GET("/:id", controller.NewSoftSalaryController().GetSoftSalaryByID())
			soft_salary.PUT("", controller.NewSoftSalaryController().UpdateSoftSalary())
			soft_salary.DELETE("/:id", controller.NewSoftSalaryController().DeleteSoftSalary())
		}
		status := v1.Group("/status")
		{
			status.POST("", controller.NewStatusController().CreateStatus())
			status.GET("", controller.NewStatusController().GetAllStatuses())
			status.GET("/:id", controller.NewStatusController().GetStatusByID())
			status.PUT("", controller.NewStatusController().UpdateStatus())
			status.DELETE("/:id", controller.NewStatusController().DeleteStatus())
		}
		work_calendar := v1.Group("/work_calendar")
		{
			work_calendar.POST("", controller.NewWorkCalendarController().CreateWorkCalendar())
			work_calendar.GET("", controller.NewWorkCalendarController().GetAllWorkCalendars())
			work_calendar.GET("/:id", controller.NewWorkCalendarController().GetWorkCalendarByID())
			work_calendar.PUT("", controller.NewWorkCalendarController().UpdateWorkCalendar())
			work_calendar.DELETE("/:id", controller.NewWorkCalendarController().DeleteWorkCalendar())
		}
		timekeeping := v1.Group("/timekeeping")
		{
			timekeeping.POST("", controller.NewTimeKeepingController().CreateTimeKeeping())
			timekeeping.GET("", controller.NewTimeKeepingController().GetAllTimeKeeping())
			timekeeping.GET("/:id", controller.NewTimeKeepingController().GetTimeKeepingByID())
			timekeeping.PUT("", controller.NewTimeKeepingController().UpdateTimeKeeping())
			timekeeping.DELETE("/:id", controller.NewTimeKeepingController().DeleteTimeKeeping())
		}
		potentialCustomerList := v1.Group("/potential_customer_list")
		{
			potentialCustomerList.POST("", controller.NewPotentialCustomerListController().CreatePotentialCustomer())
			potentialCustomerList.GET("", controller.NewPotentialCustomerListController().GetAllPotentialCustomers())
			potentialCustomerList.GET("/:id", controller.NewPotentialCustomerListController().GetPotentialCustomerByID())
			potentialCustomerList.PUT("", controller.NewPotentialCustomerListController().UpdatePotentialCustomer())
			potentialCustomerList.DELETE("/:id", controller.NewPotentialCustomerListController().DeletePotentialCustomer())
		}
		ds := v1.Group("/ds")
		{
			ds.GET("/:year/:month", controller.NewDSTeamController().GetSalesByEmployee())
			ds.GET("/team/:id/:year/:month", controller.NewDSTeamController().GetTotalSalesByTeam())
		}
		salary := v1.Group("/salary")
		{
			salary.GET("/:year/:month", controller.NewSalaryController().GetAllSalaries())
		}
	}
	return r
}
