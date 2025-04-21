import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deleteCustomerSourcesById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/customer_source/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting customer source:", error);
    return false;
  }
}
