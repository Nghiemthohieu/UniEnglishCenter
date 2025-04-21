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
import { updateDutySchedule } from "@/lib/dutyschedule/updatedutyschedule"
import { CreateWordCalendar, WordCalendar } from "@/JSON/wordcalendar"
import { Shift } from "@/JSON/shift"
import { Input } from "@mui/material"

type Props = {
  onClose: () => void
  wordcalendar: WordCalendar | null
  shift: Shift[]
}

function isThisWeekOrFuture(dateStr: string): boolean {
  const today = new Date()
  const targetDate = new Date(dateStr)

  const todayDay = today.getDay()
  const mondayThisWeek = new Date(today)
  mondayThisWeek.setDate(today.getDate() - (todayDay === 0 ? 6 : todayDay - 1))
  mondayThisWeek.setHours(0, 0, 0, 0)

  return targetDate >= mondayThisWeek
}

function getWeekdayLabel(dateStr: string): string {
  const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
  const day = new Date(dateStr).getDay()
  return days[day]
}

export default function UpdateDataDutySchedule({
  onClose,
  wordcalendar,
  shift,
}: Props) {
  const [formData, setFormData] = React.useState<WordCalendar | null>(null)

  React.useEffect(() => {
    if (wordcalendar) {
      setFormData(wordcalendar)
    }
  }, [wordcalendar])

  if (!formData) return null

  const isEditable = isThisWeekOrFuture(formData.date_word)
  const shiftIdValue =
    formData.shift && formData.shift.id ? formData.shift.id.toString() : ""

  const handleSubmit = async () => {
    if (!formData.human || !formData.shift || !formData.date_word) {
      alert("Vui lòng chọn đầy đủ ngày, nhân sự và ca trực.")
      return
    }

    const wordcalendar: CreateWordCalendar = {
      ID: formData.ID,
      date_word: formData.date_word,
      id_human: formData.human.ID,
      id_shift: formData.shift.id,
    }

    try {
      await updateDutySchedule(wordcalendar)
      alert("Cập nhật lịch làm thành công!")
      onClose()
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error)
      alert("Cập nhật thất bại!")
    }
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
      <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
      <div className="fixed z-999 min-w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Cập nhật ca trực
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input
              hidden
              value={formData.ID}
              onChange={(e) =>
                setFormData({ ...formData, ID: Number(e.target.value) })
              }
            />

            {/* Ngày trực */}
            <div className="grid gap-2">
                <Label>Ngày trực</Label>
                {isEditable ? (
                    <>
                    <Input
                        type="date"
                        value={formData.date_word}
                        onChange={(e) =>
                        setFormData({ ...formData, date_word: e.target.value })
                        }
                    />
                    <p className="text-sm text-gray-500">
                        {getWeekdayLabel(formData.date_word)}
                    </p>
                    </>
                ) : (
                    <div className="px-3 py-2 border rounded bg-muted text-muted-foreground">
                    {getWeekdayLabel(formData.date_word)} ({formData.date_word})
                    </div>
                )}
            </div>

            {/* Ca trực */}
            <div className="grid gap-2">
              <Label>Ca trực</Label>
              <Select
                value={shiftIdValue}
                onValueChange={(value) => {
                  const selectedShift = shift.find(
                    (s) => s.id.toString() === value
                  )
                  if (selectedShift) {
                    setFormData({ ...formData, shift: selectedShift })
                  }
                }}
                disabled={!isEditable}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ca làm" />
                </SelectTrigger>
                <SelectContent className="z-9999 w-full">
                  {shift.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!isEditable && (
              <p className="text-sm text-red-500">
                Không thể sửa vì ngày trực đã qua tuần hiện tại.
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isEditable}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
