import { CreateWordCalendar, WordCalendar } from "@/JSON/wordcalendar";
import { baseUrl } from "../fetchdata";

/**
 * Gửi thông tin nhân sự và ảnh CMND lên API
 */
export async function addDutySchedule(work_calendar: CreateWordCalendar): Promise<CreateWordCalendar> {

  // Gửi dữ liệu tới API dưới dạng JSON
  const res = await fetch(`${baseUrl}/duty_schudule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(work_calendar),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  const data = (await res.json()) as CreateWordCalendar;
  return data;
}
