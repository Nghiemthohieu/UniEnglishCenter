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
import { addPaymentForm } from "@/lib/payment_forms/addpaymentForm"

type Props = {
  onClose: () => void;
}

export default function AddPaymentForm({ onClose}: Props) {
  const [name, setName] = React.useState('');

  const handleSubmitUpdate = async () => {
  
    const paymentFormData: PaymentForm = {
        ID:0,
        name
    };
  
    try {
      const response = await addPaymentForm(paymentFormData);
      alert("Thêm nguồn khách hàng thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
        <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
        <div className="fixed z-999 min-w-[400px]">
            <Card>
            <CardHeader>
                <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm khóa học</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">khóa học</Label>
                    <Input id="name" placeholder="Nhập khóa học mới..." value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitUpdate}>Submit</Button>
            </CardFooter>
            </Card>
        </div>
    </div>
  )
}
