import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteHumanById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/human_resources/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting human:", error);
    return false;
  }
}
