import { getInterview } from "@/JSON/interview";
import { baseUrl } from "../fetchdata";

export async function fetchAllInterViews(): Promise<getInterview> {
    const res = await fetch(`${baseUrl}/interview_list/office/2`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch interviews');
    }
  
    const data = await res.json();
    return data.data;
  }