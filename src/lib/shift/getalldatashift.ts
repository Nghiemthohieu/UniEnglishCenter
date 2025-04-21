import { baseUrl } from "../fetchdata";
import { GetallShift } from "@/JSON/shift";

export async function fetchAllShift(): Promise<GetallShift> {
    const res = await fetch(`${baseUrl}/shift`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch shifts');
    }
  
    const data = await res.json();
    return data;
  }