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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Shift } from "@/JSON/shift"
import { CreateWordCalendar } from "@/JSON/wordcalendar"
import { addDutySchedule } from "@/lib/dutyschedule/addddutysschedule"

type Props = {
  onClose: () => void;
  shift: Shift[];
}

export default function AddDutyScheduleForm({ onClose, shift }: Props) {
  const [selectedDate, setSelectedDate] = React.useState("")
  const [selectedShiftId, setSelectedShiftId] = React.useState("")

  const handleSubmit = async () => {
    const id_human = 5 // Hoặc lấy từ context / props

    if (!selectedDate || !selectedShiftId) {
      alert("Vui lòng chọn ngày và ca làm việc.")
      return
    }

    const dataToSend: CreateWordCalendar = {
      ID: 0,
      id_human: id_human,
      date_word: selectedDate,
      id_shift: parseInt(selectedShiftId),
    }

    try {
      await addDutySchedule(dataToSend)
      alert("Đăng ký lịch làm thành công!")
      onClose()
    } catch (err) {
      console.error("Lỗi:", err)
      alert("Đăng ký thất bại!")
    }
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
      <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
      <div className="fixed z-999 min-w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Đăng ký lịch làm
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label>Chọn ngày</Label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Chọn ca làm việc</Label>
              <Select
                value={selectedShiftId}
                onValueChange={(value) => setSelectedShiftId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ca làm việc" />
                </SelectTrigger>
                <SelectContent className="z-9999 w-full">
                  {shift?.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost" onClick={onClose}>Huỷ</Button>
            <Button onClick={handleSubmit}>Đăng ký</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
