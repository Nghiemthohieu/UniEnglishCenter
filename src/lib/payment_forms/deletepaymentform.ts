import axios from "axios";
import { baseUrl } from "../fetchdata";

export async function deletePaymentFormById(id: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${baseUrl}/payment_form/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting payment_form:", error);
    return false;
  }
}
