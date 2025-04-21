import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteOfficeById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/Office/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting office:", error);
    return false;
  }
}
