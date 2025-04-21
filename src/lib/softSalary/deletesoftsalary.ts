import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteSoftSalaryById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/soft_salary/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting soft_salary:", error);
    return false;
  }
}