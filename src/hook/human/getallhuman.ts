import { ApiResponse, Human } from '@/JSON/getAllHuman';
import { baseUrl } from '@/lib/fetchdata';
import { useEffect, useState } from 'react';

export function useAllHumans() {
  const [allHumans, setAllHumans] = useState<Human[]>([]);  // Lưu dữ liệu kiểu Human[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch dữ liệu từ API
    fetch(`${baseUrl}/human_resources`)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setAllHumans(data.data);  // Lưu dữ liệu nhân sự vào state
      })
      .catch((err) => {
        setError('Đã có lỗi xảy ra');
        console.error(err);
      })
      .finally(() => setLoading(false));  // Đảm bảo setLoading là false khi fetch xong
  }, []);

  return { allHumans, loading, error };
}