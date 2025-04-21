import { baseUrl } from "../fetchdata";
import { GetWordCalendar} from "@/JSON/wordcalendar";

export async function fetchAllWordcalendar(): Promise<GetWordCalendar> {
    const res = await fetch(`${baseUrl}/work_calendar/events/3`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch positions');
    }
  
    const data = await res.json();
    return data;
  }