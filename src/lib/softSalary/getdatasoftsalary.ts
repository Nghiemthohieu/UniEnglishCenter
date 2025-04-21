import { getallsoftSalary } from "@/JSON/softSalary";
import { baseUrl } from "../fetchdata";

export async function fetchAllSoftSalary(): Promise<getallsoftSalary> {
  const token = localStorage.getItem("token"); // ✅ Lấy token từ localStorage

  const res = await fetch(`${baseUrl}/soft_salary`, {
    headers: {
      "Authorization": `Bearer ${token}`, // ✅ Gửi token trong headers
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch soft_salary");
  }

  const data = await res.json();
  return data;
}
