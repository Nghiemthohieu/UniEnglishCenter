import axios from "axios";
import { baseUrl } from "../fetchdata";
import { softSalary } from "@/JSON/softSalary";

export async function getSoftSalaryById(id: number): Promise<softSalary> {
  const response = await axios.get(`${baseUrl}/soft_salary/${id}`);
  return response.data.data
}