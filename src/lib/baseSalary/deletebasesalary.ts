import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteBaseSalaryById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/base_salary/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting base_salary:", error);
    return false;
  }
}