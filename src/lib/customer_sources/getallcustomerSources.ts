import { baseUrl } from "../fetchdata";
import { CustomerSource } from "@/JSON/bill";

export async function fetchAllCustomerSource(): Promise<CustomerSource[]> {
    const res = await fetch(`${baseUrl}/customer_source`);

    if (!res.ok) {
      throw new Error("Failed to fetch customer_source");
    }

    const data = await res.json();
    return data; // <-- đảm bảo trả về đúng kiểu mảng
}
