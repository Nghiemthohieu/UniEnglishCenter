import axios from "axios";
import { baseUrl } from "../fetchdata";
import { Shift } from "@/JSON/shift";

export async function getShiftById(id: number): Promise<Shift> {
  const response = await axios.get(`${baseUrl}/shift/${id}`);
  return response.data.data
}