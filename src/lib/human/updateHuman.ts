import { createHumanResponse, HumanNICupdate, Humanupdate } from "@/JSON/updateHuman";
import { baseUrl } from "../fetchdata";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function updateHuman(
  human: Humanupdate,
  nicData: HumanNICupdate[], // Dữ liệu CMND (mảng các đối tượng {nic: ...})
): Promise<createHumanResponse> {
  const formData = new FormData();

  // Gửi thông tin nhân sự dưới dạng JSON
  formData.append("human", JSON.stringify(human));

  formData.append("human_nic", JSON.stringify(nicData));

  const payload = {
    human: human,
    human_nic: nicData,
  };

  // Gửi dữ liệu tới API
  const res = await fetch(`${baseUrl}/human_resources`, {
    method: "PUT",
    body: JSON.stringify(payload),
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