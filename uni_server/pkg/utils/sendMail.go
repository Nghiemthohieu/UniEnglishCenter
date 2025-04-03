package util

import (
	"fmt"
	"uni_server/global"

	"gopkg.in/gomail.v2"
)

func SendMail(Gmail, header, body string) error {
	g := global.Config.Gmail
	// Cấu hình SMTP Server
	smtpHost := g.Host
	smtpPort := g.Port
	smtpUser := g.User
	smtpPass := g.Pass // Dùng App Password thay vì mật khẩu Gmail

	// Tạo email
	m := gomail.NewMessage()
	m.SetHeader("From", smtpUser)
	m.SetHeader("To", Gmail)
	m.SetHeader("Subject", header)
	m.SetBody("text/html", body)

	// Gửi email
	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("lỗi gửi mail: %w", err)
	}

	fmt.Println("✅ Email đã gửi thành công!")
	return nil
}
