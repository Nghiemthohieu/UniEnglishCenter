import { PaymentForm } from "@/JSON/bill";
import { baseUrl } from "../fetchdata";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addPaymentForm(payment_form: PaymentForm): Promise<PaymentForm> {

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/payment_form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Đặt Content-Type là application/json
    },
    body: JSON.stringify(payment_form), // Chuyển đối tượng payload thành chuỗi JSON
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as PaymentForm;
  return data;
}
