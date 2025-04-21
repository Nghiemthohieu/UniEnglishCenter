import { CustomerSource } from "@/JSON/bill";
import { baseUrl } from "../fetchdata";

/**
 * Cập nhật nguồn khách hàng
 */
export async function updateCustomerSources(customer_source: CustomerSource): Promise<CustomerSource> {
  try {
    const res = await fetch(`${baseUrl}/customer_source`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer_source),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = (await res.json()) as CustomerSource;
    return data;
  } catch (error) {
    console.error("Error updating customer_source:", error);
    throw error;
  }
}
