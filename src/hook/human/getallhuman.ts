import { ApiResponse, Human } from '@/JSON/getAllHuman';
import { baseUrl } from '@/lib/fetchdata';
import { useEffect, useState } from 'react';

export function useAllHumans(triggerFetch: boolean) {
  const [allHumans, setAllHumans] = useState<Human[]>([]);  // Lưu dữ liệu kiểu Human[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Đảm bảo mỗi lần triggerFetch thay đổi, chúng ta sẽ thực hiện lại fetch
    const fetchHumans = async () => {
      try {
        setLoading(true); // Bắt đầu load
        const res = await fetch(`${baseUrl}/human_resources`);
        if (!res.ok) throw new Error('Dữ liệu không thể tải');

        const data: ApiResponse = await res.json();
        setAllHumans(data.data);  // Lưu dữ liệu nhân sự vào state
      } catch (err) {
        setError('Đã có lỗi xảy ra'); // Cập nhật thông báo lỗi
        console.error(err);
      } finally {
        setLoading(false);  // Đảm bảo setLoading là false khi fetch xong
      }
    };

    fetchHumans();  // Gọi hàm fetchHumans để lấy dữ liệu
  }, [triggerFetch]);  // Trigger lại mỗi khi `triggerFetch` thay đổi

  return { allHumans, loading, error };
}   
