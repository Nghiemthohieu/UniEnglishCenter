import { CountInterviewHuman, getInterview } from "@/JSON/interview";
import { baseUrl } from "../fetchdata";
import { getallSalary, Salary } from "@/JSON/salary";

export async function fetchallSalary(id: number, month: number, year: number): Promise<getallSalary> {
    const res = await fetch(`${baseUrl}/salary/all/${id}/${year}/${month}`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch salary');
    }
  
    const data = await res.json();
    return data;
  }