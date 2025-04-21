import axios from "axios";
import { baseUrl } from "../fetchdata";
import { Position } from "@/JSON/position";

export async function getPositionById(id: number): Promise<Position> {
  const response = await axios.get(`${baseUrl}/position/${id}`);
  return response.data.data
}