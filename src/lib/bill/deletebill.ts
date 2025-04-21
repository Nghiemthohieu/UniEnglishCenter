import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteBillById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/bill/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting bill:", error);
    return false;
  }
}
