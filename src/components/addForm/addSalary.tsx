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
import { CreateSoftSalary } from "@/JSON/softSalary"
import { Position } from "@/JSON/position"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { addSoftSalary } from "@/lib/softSalary/addsoftsalary"
import { CreateSalary } from "@/lib/salary/addsalary"

type Props = {
  onClose: () => void;
}

export default function AddSalaryForm({ onClose }: Props) {
    const today = new Date();
    const [month, setMonth] = React.useState<string>(String(today.getMonth() + 1));
    const [year, setYear] = React.useState<string>(String(today.getFullYear()));

    const years = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

    // Xác định số tháng tối đa được chọn
    const maxMonth = parseInt(year) === today.getFullYear() ? today.getMonth() + 1 : 12;

    // Tạo danh sách tháng dựa trên maxMonth
    const months = Array.from({ length: maxMonth }, (_, i) => i + 1);
    React.useEffect(() => {
        const max = parseInt(year) === today.getFullYear() ? today.getMonth() + 1 : 12;
        if (parseInt(month) > max) {
          setMonth(String(max));
        }
      }, [year]);
  const handleSubmitUpdate = async () => {
  
    try {
      const response = await CreateSalary(Number(month),Number(year));
      alert("Thêm thành công!");
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
                <CardTitle className="uppercase drop-shadow-md text-[16px]">Tạo bảng lương</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="position">Tháng</Label>
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Tháng" />
                            </SelectTrigger>
                            <SelectContent className="z-99999">
                                {months.map((m) => (
                                    <SelectItem key={m} value={String(m)}>
                                        Tháng {m}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="position">năm</Label>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Năm" />
                            </SelectTrigger>
                            <SelectContent className="z-99999">
                                {years.map((y) => (
                                    <SelectItem key={y} value={String(y)}>
                                    Năm {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
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
