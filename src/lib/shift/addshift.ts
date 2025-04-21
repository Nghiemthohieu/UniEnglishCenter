import { Shift } from "@/JSON/shift";
import { baseUrl } from "../fetchdata";
import { PositionCreated } from "@/JSON/position";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addShift(shift: Shift): Promise<Shift> {

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/shift`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Đặt Content-Type là application/json
    },
    body: JSON.stringify(shift), // Chuyển đối tượng payload thành chuỗi JSON
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as Shift;
  return data;
}
