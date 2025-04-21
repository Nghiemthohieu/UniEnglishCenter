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
import { CreateSoftSalary, softSalary } from "@/JSON/softSalary"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { updateSoftSalary } from "@/lib/softSalary/updatesoftSalary"

type Props = {
  onClose: () => void;
  salary: softSalary | null;
  position: Position[] | null
}
export default function UpdateDataSoftSalary({onClose,salary, position}: Props) {
  const [formData, setFormData] = React.useState<softSalary | null>(null)
  React.useEffect(() => {
        if (salary) {
            setFormData(salary);
        }
    }, [salary]);

  if (!formData) return null

  const handleSubmit = async () => {
    
    const SalaryData: CreateSoftSalary = {
      ID: formData.ID,
      id_position: formData.id_position,
      care_part_1: formData.care_part_1,                  // 👈 truyền đúng `Team[]`
      target_1: formData.target_1,                  // 👈 truyền đúng `Team[]`
      care_part_2: formData.care_part_2,                  // 👈 truyền đúng `Team[]`
      target_2: formData.target_2,                  // 👈 truyền đúng `Team[]`
      care_part_3: formData.care_part_3,                  // 👈 truyền đúng `Team[]`
    };
  
    try {
      const response = await updateSoftSalary(SalaryData); // Gửi dữ liệu nhân sự và ảnh CMND
      alert("sửa thành công!");
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
              Cập nhật mốc phần trăm ds cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />

            <div className="grid gap-2">
                <Label htmlFor="position">Chức vụ</Label>
                <Select
                  value={formData.position.ID.toString()}
                  onValueChange={(value) => {
                    const selected = position?.find(p => p.ID.toString() === value)
                    if (selected) setFormData({ ...formData, position: selected })
                  }}
                >
                  <SelectTrigger id="position" className="w-full">
                    <SelectValue placeholder="Chức vụ" />
                  </SelectTrigger>
                  <SelectContent className="z-9999 w-full">
                    {position?.map(position => (
                      <SelectItem key={position.ID} value={position.ID.toString()}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acronym">Phần trăm 1</Label>
              <Input
                id="acronym"
                placeholder="Nhập phần trăm..."
                value={formData.care_part_1}
                onChange={(e) => setFormData({ ...formData, care_part_1: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">mốc 1</Label>
              <Input
                id="name"
                placeholder="Nhập mốc..."
                value={formData.target_1}
                onChange={(e) => setFormData({ ...formData, target_1: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acronym">Phầm trăm 2</Label>
              <Input
                id="acronym"
                placeholder="Nhập phần trăm..."
                value={formData.care_part_2}
                onChange={(e) => setFormData({ ...formData, care_part_2: Number(e.target.value) })}
              />
            </div><div className="grid gap-2">
              <Label htmlFor="name">Mốc 2</Label>
              <Input
                id="name"
                placeholder="Nhập mốc..."
                value={formData.target_2}
                onChange={(e) => setFormData({ ...formData, target_2: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acronym">Phần trăm 3</Label>
              <Input
                id="acronym"
                placeholder="Nhập phần trăm..."
                value={formData.care_part_3}
                onChange={(e) => setFormData({ ...formData, care_part_3: Number(e.target.value) })}
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
