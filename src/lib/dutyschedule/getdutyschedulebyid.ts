import axios from "axios";
import { baseUrl } from "../fetchdata";
import { CreateWordCalendar } from "@/JSON/wordcalendar";

export async function getDutyScheduleById(id: number): Promise<CreateWordCalendar> {
  const response = await axios.get(`${baseUrl}/duty_schudule/${id}`);
  return response.data.data
}