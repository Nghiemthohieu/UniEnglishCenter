import { OfficeCreate } from "@/JSON/office";
import { baseUrl } from "../fetchdata";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addOffice(office: OfficeCreate): Promise<OfficeCreate> {

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/Office`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Đặt Content-Type là application/json
    },
    body: JSON.stringify(office), // Chuyển đối tượng payload thành chuỗi JSON
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as OfficeCreate;
  return data;
}
