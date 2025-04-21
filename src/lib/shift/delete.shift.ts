import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteShiftById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/shift/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting positon:", error);
    return false;
  }
}
