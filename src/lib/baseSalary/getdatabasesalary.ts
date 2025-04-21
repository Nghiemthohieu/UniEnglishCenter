import { getallPosition } from "@/JSON/position";
import { baseUrl } from "../fetchdata";
import { getallsoftSalary } from "@/JSON/softSalary";

export async function fetchAllBaseSalary(): Promise<getallsoftSalary> {
    const res = await fetch(`${baseUrl}/base_salary`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch base_salary');
    }
  
    const data = await res.json();
    return data;
  }