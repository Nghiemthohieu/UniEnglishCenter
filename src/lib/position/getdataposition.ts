import { getallPosition } from "@/JSON/position";
import { baseUrl } from "../fetchdata";

export async function fetchAllPositions(): Promise<getallPosition> {
    const res = await fetch(`${baseUrl}/position`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch positions');
    }
  
    const data = await res.json();
    return data;
  }