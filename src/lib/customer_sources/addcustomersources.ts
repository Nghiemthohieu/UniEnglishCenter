import { baseUrl } from "../fetchdata";
import { CustomerSource } from "@/JSON/bill";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addCustomerSources(customer_source: CustomerSource): Promise<CustomerSource> {

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/customer_source`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Đặt Content-Type là application/json
    },
    body: JSON.stringify(customer_source), // Chuyển đối tượng payload thành chuỗi JSON
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as CustomerSource;
  return data;
}
