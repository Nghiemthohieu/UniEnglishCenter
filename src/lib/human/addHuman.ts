import { createHumanResponse, HumanCreate, HumanNICCreate } from "@/JSON/createHuman";

import { baseUrl } from "../fetchdata";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addHuman(
  human: HumanCreate,
  nicData: HumanNICCreate[], // Dữ liệu CMND (mảng các đối tượng {nic: ...})
): Promise<createHumanResponse> {
  // Tạo đối tượng dữ liệu gửi đi
  const payload = {
    human: human,
    human_nic: nicData,
  };

  // ✅ Hiển thị dữ liệu trước khi gửi
  console.log("Dữ liệu gửi đi:", payload);

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/human_resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Đặt Content-Type là application/json
    },
    body: JSON.stringify(payload), // Chuyển đối tượng payload thành chuỗi JSON
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as createHumanResponse;
  return data;
}
