package main

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func sendMail() error {
	// Cấu hình SMTP Server
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpUser := "unienglishcg@gmail.com"
	smtpPass := "kbst owpm vlbk htsx" // Dùng App Password thay vì mật khẩu Gmail

	// Tạo email
	m := gomail.NewMessage()
	m.SetHeader("From", smtpUser)
	m.SetHeader("To", "hieunghiem2712@gmail.com")
	m.SetHeader("Subject", "")
	m.SetBody("text/html", "Xin chào! Đây là email gửi bằng <b>Golang</b>!")

	// Gửi email
	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("lỗi gửi mail: %w", err)
	}

	fmt.Println("✅ Email đã gửi thành công!")
	return nil
}

func main() {
	err := sendMail()
	if err != nil {
		fmt.Println("❌ Gửi email thất bại:", err)
	}
}
