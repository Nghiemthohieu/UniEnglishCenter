import axios from "axios";
import { baseUrl } from "../fetchdata";
import { PaymentForm } from "@/JSON/bill";

export async function getPaymentFormById(id: number): Promise<PaymentForm> {
  const response = await axios.get(`${baseUrl}/payment_form/${id}`);
  return response.data.data
}