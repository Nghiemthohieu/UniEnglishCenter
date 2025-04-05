import { getallOffice } from "@/JSON/office";
import { baseUrl } from "../fetchdata";

export async function fetchAllOffice(): Promise<getallOffice> {
    const res = await fetch(`${baseUrl}/Office`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch office');
    }
  
    const dataOffice = await res.json();
    return dataOffice;
  }