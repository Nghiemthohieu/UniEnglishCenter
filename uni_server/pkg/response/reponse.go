package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ResponseData struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Errorr  string      `json:"error,omitempty"`
}

func SuccessResponse(c *gin.Context, Code int, Data interface{}) {
	c.JSON(http.StatusOK, ResponseData{
		Code:    Code,
		Message: msg[Code],
		Data:    Data,
	})
}

func ErrorRespone(c *gin.Context, http int, Code int, messege string, err error) {
	c.JSON(http, ResponseData{
		Code:    Code,
		Message: msg[Code],
		Data:    nil,
		Errorr:  err.Error(),
	})
}
