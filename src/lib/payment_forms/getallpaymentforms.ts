import { baseUrl } from "../fetchdata";
import { CustomerSource, PaymentForm } from "@/JSON/bill";

export async function fetchAllPaymentForm(): Promise<PaymentForm> {
    const res = await fetch(`${baseUrl}/payment_form`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch payment_form');
    }
  
    const data = await res.json();
    return data;
  }