import { CountDateInterviewIn, CountDateInterviewOut, interview } from "@/JSON/interview";
import { baseUrl } from "../fetchdata";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function CountDateInterView(interview: CountDateInterviewIn): Promise<CountDateInterviewOut> {
  const token = localStorage.getItem("authToken") // Lấy token từ localStorage

  const res = await fetch(`${baseUrl}/interview_list/date`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Thêm token vào header
    },
    body: JSON.stringify(interview),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  const data = (await res.json()) as CountDateInterviewOut;
  return data;
}
