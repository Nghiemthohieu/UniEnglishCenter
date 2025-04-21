import { CountInterviewHuman } from "@/JSON/interview";
import { baseUrl } from "../fetchdata";

/**
 * Lấy số lần phỏng vấn của một nhân sự theo tháng
 */
export async function fetchCountHumanInterViews(
  id: number,
  year: number,
  month: number
): Promise<CountInterviewHuman> {
  try {
    const res = await fetch(`${baseUrl}/interview_list/human/${id}/${year}/${month}`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Fetch failed: ${res.status} - ${error}`);
    }

    const data = await res.json();
    return data as CountInterviewHuman;
  } catch (error) {
    console.error("Error fetching interview count:", error);
    throw error;
  }
}
