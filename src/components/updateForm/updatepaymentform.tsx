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
import { PaymentForm } from "@/JSON/bill"
import { updatePaymentForm } from "@/lib/payment_forms/updatepaymentform"

type Props = {
  onClose: () => void;
  payment_form: PaymentForm | null;
}
export default function UpdateDataCustomerSources({onClose, payment_form}: Props) {
  const [formData, setFormData] = React.useState<PaymentForm | null>(null)
  React.useEffect(() => {
        if (payment_form) {
            setFormData(payment_form);
        }
    }, [payment_form]);

  if (!formData) return null

  const handleSubmit = async () => {
    
    const paymentFormData: PaymentForm = {
      ID: formData.ID,
      name: formData.name               // 👈 truyền đúng `Team[]`
    };
  
    try {
      const response = await updatePaymentForm(paymentFormData); // Gửi dữ liệu nhân sự và ảnh CMND
      alert("sửa hình thức thanh toán thành công!");
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
              Cập nhật hình thức thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />

            <div className="grid gap-2">
              <Label htmlFor="name">Hình thức thanh toán</Label>
              <Input
                id="name"
                placeholder="Nhập hình thức thanh toán..."
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
