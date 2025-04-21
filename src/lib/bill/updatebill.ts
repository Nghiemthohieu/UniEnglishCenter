import { createHumanResponse, HumanNICupdate, Humanupdate } from "@/JSON/updateHuman";
import { baseUrl } from "../fetchdata";
import { Bill, BillIMG, createBillResponse } from "@/JSON/bill";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function updateBill(
  bill: Bill,
  bill_img: BillIMG[], // Dữ liệu CMND (mảng các đối tượng {nic: ...})
): Promise<createBillResponse> {
  const formData = new FormData();

  // Gửi thông tin nhân sự dưới dạng JSON
  formData.append("human", JSON.stringify(bill));

  formData.append("human_nic", JSON.stringify(bill_img));

  const payload = {
    bill: bill,
    bill_img: bill_img,
  };

  // Gửi dữ liệu tới API
  const res = await fetch(`${baseUrl}/bill`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  // Xử lý nếu có lỗi trong khi gửi
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  // Trả về kết quả từ API
  const data = (await res.json()) as createBillResponse;
  return data;
}