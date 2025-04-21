import { baseUrl } from "../fetchdata";
import { Bill, BillIMG, createBillResponse } from "@/JSON/bill";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addBill(
  bill: Bill,
  img: BillIMG[], // Dữ liệu CMND (mảng các đối tượng {nic: ...})
): Promise<createBillResponse> {
  // Tạo đối tượng dữ liệu gửi đi
  const payload = {
    bill: bill,
    bill_img: img,
  };

  // ✅ Hiển thị dữ liệu trước khi gửi
  console.log("Dữ liệu gửi đi:", payload);

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/bill`, {
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
  const data = (await res.json()) as createBillResponse;
  return data;
}
