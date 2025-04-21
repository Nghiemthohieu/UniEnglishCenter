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
import { Shift } from "@/JSON/shift"
import { updateShift } from "@/lib/shift/updateshift"

type Props = {
  onClose: () => void;
  shift: Shift | null;
}

// Helper để đảm bảo format time là HH:mm:ss
const ensureTimeFormat = (time: string) => {
  return time.length === 5 ? `${time}:00` : time;
};

export default function UpdateDataShift({ onClose, shift }: Props) {
  const [formData, setFormData] = React.useState<Shift | null>(null)

  React.useEffect(() => {
    if (shift) {
      setFormData(shift);
    }
  }, [shift]);

  if (!formData) return null;

  const handleSubmit = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

      const payload = {
        ...formData,
        time_start: `${today}T${ensureTimeFormat(formData.time_start)}Z`,
        time_out: `${today}T${ensureTimeFormat(formData.time_out)}Z`,
      };

      await updateShift(payload);
      alert("Sửa ca làm thành công!");
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
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Cập nhật ca làm
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: Number(e.target.value) })} />

            <div className="grid gap-2">
              <Label htmlFor="shift">Ca làm</Label>
              <Input
                id="shift"
                placeholder="Nhập ca làm..."
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time_start">Thời gian bắt đầu</Label>
              <Input
                type="time"
                id="time_start"
                value={formData.time_start?.slice(0, 5)} // "HH:mm"
                onChange={(e) =>
                  setFormData({ ...formData, time_start: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time_end">Thời gian kết thúc</Label>
              <Input
                type="time"
                id="time_end"
                value={formData.time_out?.slice(0, 5)} // "HH:mm"
                onChange={(e) =>
                  setFormData({ ...formData, time_out: e.target.value })
                }
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
