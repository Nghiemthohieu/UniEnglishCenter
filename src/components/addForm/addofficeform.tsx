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
import { OfficeCreate } from "@/JSON/office"
import { addOffice } from "@/lib/office/addoffice"

type Props = {
  onClose: () => void;
}

export default function AddOfficeForm({ onClose}: Props) {
  const [name, setName] = React.useState('');
  const [acronym, setAcronym] = React.useState('');

  const handleSubmitUpdate = async () => {
  
    const officeData: OfficeCreate = {
        name,
        acronym
    };
  
    try {
      const response = await addOffice(officeData);
      alert("Thêm văn phòng thành công!");
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
                <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm văn phòng</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Văn phòng</Label>
                    <Input id="name" placeholder="Nhập chức vụ..." value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="acronym">Viết tắt</Label>
                    <Input id="acronym" value={acronym} onChange={e => setAcronym(e.target.value)} placeholder="Nhập chữ viết tắt của chức vụ..." />
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
