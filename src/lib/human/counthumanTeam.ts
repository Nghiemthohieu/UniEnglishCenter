import { baseUrl } from "../fetchdata";

export async function getCountHumanTeam(id: number): Promise<number> {
  try {
    const token = localStorage.getItem("token"); // 👉 Lấy token từ localStorage

    const response = await fetch(`${baseUrl}/human_resources/count/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 👉 Gắn token vào header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await response.json();
    return Number(json.data); // Giả sử API trả về { code, message, data }
  } catch (error) {
    console.error("Error fetching human count:", error);
    return 0;
  }
}
