import axios from "axios";
import { baseUrl } from "../fetchdata";
import { Office } from "@/JSON/office";

export async function getOfficeById(id: number): Promise<Office> {
  const response = await axios.get(`${baseUrl}/Office/${id}`);
  return response.data.data
}