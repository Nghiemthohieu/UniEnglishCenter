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
import { Shift } from "@/JSON/shift"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { CreateWordCalendar, WordCalendar } from "@/JSON/wordcalendar"
import { addWordCalendar } from "@/lib/wordcalendat/addwordcalendar"

type Props = {
  onClose: () => void;
  shift: Shift[]
}

type DayShift = {
  date: string;
  label: string;
  shiftId: string;
}

export default function AddWordCalendarForm({ onClose, shift }: Props) {
  const [schedule, setSchedule] = React.useState<DayShift[]>([])

  React.useEffect(() => {
    const today = new Date()
    const currentDay = today.getDay() // 0 = CN, 1 = T2, ..., 6 = T7
  
    const allLabels = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
    let result: DayShift[] = []
  
    if (currentDay >= 1 && currentDay <= 5) {
      // Nếu hôm nay là T2 - T6 → từ ngày mai đến T7 tuần này
      const daysToAdd = 6 - currentDay // số ngày còn lại đến T7
      for (let i = 1; i <= daysToAdd; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const futureDay = (currentDay + i) % 7
        result.push({
          label: allLabels[futureDay],
          date: date.toISOString().split("T")[0],
          shiftId: "",
        })
      }
    } else {
      // Nếu hôm nay là T7 (6) hoặc CN (0) → từ T2 đến T7 tuần sau
      const offsetToNextMonday = currentDay === 0 ? 1 : 8 - currentDay
      const mondayNextWeek = new Date(today)
      mondayNextWeek.setDate(today.getDate() + offsetToNextMonday)
  
      for (let i = 0; i < 6; i++) {
        const date = new Date(mondayNextWeek)
        date.setDate(mondayNextWeek.getDate() + i)
        result.push({
          label: allLabels[(1 + i) % 7], // Thứ hai đến Thứ bảy
          date: date.toISOString().split("T")[0],
          shiftId: "",
        })
      }
    }
  
    setSchedule(result)
  }, [])

  const handleChangeShift = (index: number, shiftId: string) => {
    const updated = [...schedule]
    updated[index].shiftId = shiftId
    setSchedule(updated)
  }

  const handleSubmit = async () => {
    const id_human = 5 // hoặc lấy từ props/context
  
    const dataToSend: CreateWordCalendar[] = schedule
      .filter((day) => day.shiftId) // chỉ lấy những ngày đã chọn ca
      .map((day) => ({
        ID: 0,
        id_human: id_human,
        date_word: day.date,
        id_shift: parseInt(day.shiftId),
      }))
  
    try {
      await addWordCalendar(dataToSend)
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
            <CardTitle className="uppercase drop-shadow-md text-[16px]">Đăng ký lịch làm</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {schedule.map((day, index) => (
              <div className="grid gap-2" key={day.date}>
                <Label>{day.label} ({day.date})</Label>
                <Select
                  value={day.shiftId}
                  onValueChange={(value) => handleChangeShift(index, value)}
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
            ))}
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
