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
import { Position } from "@/JSON/position"
import { updatePosition } from "@/lib/position/updateposition"

type Props = {
  onClose: () => void;
  position: Position | null;
}
export default function UpdateDataPosition({onClose,position}: Props) {
  const [formData, setFormData] = React.useState<Position | null>(null)
  React.useEffect(() => {
        if (position) {
            setFormData(position);
        }
    }, [position]);

  if (!formData) return null

  const handleSubmit = async () => {
    
    const positionData: Position = {
      ID: formData.ID,
      name: formData.name,
      acronym: formData.acronym                  // 👈 truyền đúng `Team[]`
    };
  
    try {
      const response = await updatePosition(positionData); // Gửi dữ liệu nhân sự và ảnh CMND
      alert("sửa nhân sự thành công!");
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
              Cập nhật thông tin nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />

            <div className="grid gap-2">
              <Label htmlFor="name">Chức vụ</Label>
              <Input
                id="name"
                placeholder="Nhập chức vụ..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acronym">Viết tắt</Label>
              <Input
                id="acronym"
                placeholder="Nhập tên viết tắt..."
                value={formData.acronym}
                onChange={(e) => setFormData({ ...formData, acronym: e.target.value })}
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
