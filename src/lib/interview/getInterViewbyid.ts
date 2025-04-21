import axios from "axios";
import { baseUrl } from "../fetchdata";
import { getInterview } from "@/JSON/interview";

export async function getInterViewById(id: number): Promise<getInterview> {
  const response = await axios.get(`${baseUrl}/interview_list/${id}`);
  return response.data.data
}