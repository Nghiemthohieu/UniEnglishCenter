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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateWordCalendar } from "@/lib/wordcalendat/updatewordcalendar"
import { CreateWordCalendar, WordCalendar } from "@/JSON/wordcalendar"
import { Shift } from "@/JSON/shift"
import { Input } from "@mui/material"

type Props = {
  onClose: () => void;
  wordcalendar: WordCalendar | null;
  shift: Shift[];
}

export default function UpdateDataWordCalendar({ onClose, wordcalendar, shift }: Props) {
  const [formData, setFormData] = React.useState<WordCalendar | null>(null)

  React.useEffect(() => {
    if (wordcalendar) {
      setFormData(wordcalendar)
    }
  }, [wordcalendar])

  if (!formData) return null

  const handleSubmit = async () => {
    if (!formData.human || !formData.shift) {
        alert("Vui lòng chọn đầy đủ nhân sự và ca làm.");
        return;
    }
    const wordcalendar: CreateWordCalendar = {
        ID: formData.ID,
        date_word: formData.date_word,
        id_human: formData.human!.ID,
        id_shift: formData.shift!.id,
    }
    try {
      await updateWordCalendar(wordcalendar)
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
              Cập nhật ca làm việc
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />
            <div className="grid gap-2">
              <Label>Ngày làm</Label>
              <div className="px-3 py-2 border rounded bg-muted text-muted-foreground">
                {formData.date_word}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Ca làm</Label>
              <Select
                    value={formData.shift?.id.toString()}
                    onValueChange={(value) => {
                        const selectedShift = shift.find((s) => s.id.toString() === value)
                        if (selectedShift) {
                        setFormData({ ...formData, shift: selectedShift })
                        }
                    }}
                    >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="ca làm" />
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
