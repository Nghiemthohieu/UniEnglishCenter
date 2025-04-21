import axios from "axios";
import { baseUrl } from "../fetchdata";
import { CreateWordCalendar } from "@/JSON/wordcalendar";

export async function getWordCalendarById(id: number): Promise<CreateWordCalendar> {
  const response = await axios.get(`${baseUrl}/work_calendar/${id}`);
  return response.data.data
}