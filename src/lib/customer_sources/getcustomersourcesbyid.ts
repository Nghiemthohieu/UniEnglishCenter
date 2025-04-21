import axios from "axios";
import { baseUrl } from "../fetchdata";
import { CustomerSource } from "@/JSON/bill";

export async function getCustomerSourcesById(id: number): Promise<CustomerSource> {
  try {
    const response = await axios.get(`${baseUrl}/customer_source/${id}`);
    return response.data.data as CustomerSource;
  } catch (error) {
    console.error(`Error fetching customer_source with id ${id}:`, error);
    throw error;
  }
}
