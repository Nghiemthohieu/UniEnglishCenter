"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shift } from "@/JSON/shift";
import { addShift } from "@/lib/shift/addshift";

type Props = {
  onClose: () => void;
};

export default function AddShiftForm({ onClose }: Props) {
  const [shift, setShift] = React.useState("");
  const [timeStart, setTimeStart] = React.useState("");
  const [timeOut, setTimeOut] = React.useState("");

  const getISODateTime = (time: string): string => {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = time.length === 5 ? `${time}:00` : time; // HH:MM:SS
    return `${date}T${formattedTime}+07:00`; // ISO 8601 với timezone
  };

  const handleSubmit = async () => {
    const ShiftData: Shift = {
      id: 0,
      shift,
      time_start: getISODateTime(timeStart),
      time_out: getISODateTime(timeOut),
    };

    try {
      await addShift(ShiftData);
      alert("Thêm ca làm thành công!");
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
              Thêm ca làm
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="shift">Tên ca làm</Label>
              <Input
                id="shift"
                placeholder="Ví dụ: Ca sáng"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time_start">Giờ bắt đầu</Label>
              <Input
                id="time_start"
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time_out">Giờ kết thúc</Label>
              <Input
                id="time_out"
                type="time"
                value={timeOut}
                onChange={(e) => setTimeOut(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
