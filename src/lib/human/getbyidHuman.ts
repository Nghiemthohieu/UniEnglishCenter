import axios from "axios";
import { Human } from "@/JSON/getAllHuman";
import { baseUrl } from "../fetchdata";
import { HumanNICCreate } from "@/JSON/createHuman";

export async function getHumanById(id: number): Promise<{ human: Human, human_nic: HumanNICCreate[] }> {
  const response = await axios.get(`${baseUrl}/human_resources/${id}`);
  return {
    human: response.data.data.human,
    human_nic: response.data.data.human_nic
  };
}