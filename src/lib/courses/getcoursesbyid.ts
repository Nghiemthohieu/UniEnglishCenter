import axios from "axios";
import { baseUrl } from "../fetchdata";
import { Courses } from "@/JSON/bill";

export async function getCoursesById(id: number): Promise<Courses> {
  const response = await axios.get(`${baseUrl}/course/${id}`);
  return response.data.data
}