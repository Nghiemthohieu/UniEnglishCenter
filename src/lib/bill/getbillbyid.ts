import axios from "axios";
import { Human } from "@/JSON/getAllHuman";
import { baseUrl } from "../fetchdata";
import { HumanNICCreate } from "@/JSON/createHuman";
import { Bill, BillIMG, getBill } from "@/JSON/bill";

export async function getBillById(id: number): Promise<{ bill: getBill, bill_img: BillIMG[] }> {
  const response = await axios.get(`${baseUrl}/bill/${id}`);
  return {
    bill: response.data.data.bill,
    bill_img: response.data.data.bill_img
  };
}