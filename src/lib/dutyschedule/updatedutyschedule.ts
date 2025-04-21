import { CreateWordCalendar } from "@/JSON/wordcalendar";
import { baseUrl } from "../fetchdata";
/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function updateDutySchedule(wordcalendar: CreateWordCalendar): Promise<CreateWordCalendar> {

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/duty_schudule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Đặt Content-Type là application/json
    },
    body: JSON.stringify(wordcalendar), // Chuyển đối tượng payload thành chuỗi JSON
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as CreateWordCalendar;
  return data;
}