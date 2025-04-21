import { baseUrl } from "../fetchdata";
import { GetWordCalendar} from "@/JSON/wordcalendar";

export async function fetchDutyScheduleByOffice(): Promise<GetWordCalendar> {
    const res = await fetch(`${baseUrl}/duty_schudule/human/2`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch duty');
    }
  
    const data = await res.json();
    return data;
  }