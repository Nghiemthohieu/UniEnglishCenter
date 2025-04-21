import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteInterViewById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/interview_list/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting interview_list:", error);
    return false;
  }
}
