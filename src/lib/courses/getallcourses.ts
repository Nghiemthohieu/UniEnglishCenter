import { baseUrl } from "../fetchdata";
import { Courses } from "@/JSON/bill";

export async function fetchAllCourses(): Promise<Courses> {
    const res = await fetch(`${baseUrl}/course`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
  
    const data = await res.json();
    return data;
  }