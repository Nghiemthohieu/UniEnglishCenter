import axios from "axios";
import { baseUrl } from "../fetchdata";
import { DsTotalHuman } from "@/JSON/ds";

export async function getDSTatolHuman(id: number, year: number, month: number): Promise<DsTotalHuman> {
  try {
    const token = localStorage.getItem("token"); // hoặc lấy từ context/store

    const response = await axios.get(`${baseUrl}/ds/team/${id}/${year}/${month}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching DsTotalHuman:", error);
    throw error;
  }
}
