"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Office } from "@/JSON/office"
import { updateOffice } from "@/lib/office/updateoffice"
import { CustomerSource } from "@/JSON/bill"
import { updateCustomerSources } from "@/lib/customer_sources/updatecustomersources"

type Props = {
  onClose: () => void;
  customer_sources: CustomerSource | null;
}
export default function updateCustomerSource({onClose, customer_sources}: Props) {
  const [formData, setFormData] = React.useState<CustomerSource | null>(null)
  React.useEffect(() => {
        if (customer_sources) {
            setFormData(customer_sources);
        }
    }, [customer_sources]);

  if (!formData) return null

  const handleSubmit = async () => {
    
    const customerSourcesData: CustomerSource = {
      ID: formData.ID,
      name: formData.name               // 👈 truyền đúng `Team[]`
    };
  
    try {
      const response = await updateCustomerSources(customerSourcesData); // Gửi dữ liệu nhân sự và ảnh CMND
      alert("sửa nguồn khách hàng thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
      <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
      <div className="fixed z-999 min-w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Cập nhật nguồn khách hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />

            <div className="grid gap-2">
              <Label htmlFor="name">Nguồn khách hàng</Label>
              <Input
                id="name"
                placeholder="Nhập nguồn khách hàng..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
