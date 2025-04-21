import { CountInterviewResult, getInterview } from "@/JSON/interview";
import { baseUrl } from "../fetchdata";

export async function fetchCountResultInterViews(id: number, year: number, month: number): Promise<CountInterviewResult> {
    const res = await fetch(`${baseUrl}/interview_list/result/${id}/${year}/${month}`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch interviews');
    }
  
    const data = await res.json();
    return data;
  }