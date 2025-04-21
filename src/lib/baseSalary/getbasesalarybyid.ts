import axios from "axios";
import { baseUrl } from "../fetchdata";
import { Salary } from "@/JSON/salary";
import { softSalary } from "@/JSON/softSalary";

export async function getBaseSalaryById(id: number): Promise<softSalary> {
  const response = await axios.get(`${baseUrl}/base_salary/${id}`);
  return response.data.data
}