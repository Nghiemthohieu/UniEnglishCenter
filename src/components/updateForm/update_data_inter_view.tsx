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
import { getInterview, interview } from "@/JSON/interview"
import dayjs from "dayjs"
import { updateInterView } from "@/lib/interview/updateInterView"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

type Props = {
  onClose: () => void;
  inter_view: getInterview | null;
}
export default function UpdateDataInterView({onClose,inter_view}: Props) {
    const [formData, setFormData] = React.useState<getInterview | null>(null)
    const [dateInterview, setDateInterview] = React.useState<dayjs.Dayjs | null>(null);
    React.useEffect(() => {
        if (inter_view) {
            setFormData(inter_view);
            setDateInterview(dayjs(inter_view.date_interview))
        }
    }, [inter_view]);

    if (!formData) return null

    const handleSubmit = async () => {
        
        const interViewData: interview = {
            ID: formData.ID,
            name: formData.name,
            phone_number: formData.phone_number,
            email: formData.email,
            id_human: formData.id_human,
            school: formData.school,
            birt_year: formData.birt_year,
            date_interview: dayjs(dateInterview).format('YYYY-MM-DD'),   
            time_interview: formData.time_interview,
            form_inter: formData.form_inter,
            result: formData.result,
            notes: formData.notes,
        };
    
        try {
        const response = await updateInterView(interViewData); // Gửi dữ liệu nhân sự và ảnh CMND
        alert("sửa thông tin phỏng vấn thành công!");
        onClose();
        } catch (error) {
        console.error("Lỗi gửi dữ liệu:", error);
        alert("Gửi dữ liệu thất bại");
        }
    }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
      <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
      <div className="fixed z-999 min-w-[550px]">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Cập nhật thông tin phỏng vấn
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />   
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Họ tên</Label>
                    <Input
                        id="name"
                        placeholder="Nhập họ tên..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">SĐT</Label>
                    <Input
                        id="phone"
                        placeholder="Nhập SĐT..."
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="Nhập email..."
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="school">Trường</Label>
                    <Input
                        id="school"
                        placeholder="Nhập trường..."
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="birtyear">năm sinh</Label>
                    <Input
                        id="birtyear"
                        placeholder="Nhập năm sinh..."
                        value={formData.birt_year}
                        onChange={(e) => setFormData({ ...formData, birt_year: Number(e.target.value) })}
                    />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Ngày phỏng vấn"
                    value={dateInterview}
                    onChange={(date) => {
                        setDateInterview(date)
                        setFormData({ ...formData, date_interview: date?.format("YYYY-MM-DD") || "" })
                      }}
                    />
                </LocalizationProvider>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="timeinter">Giờ phỏng vấn</Label>
                    <Input id="timeinter" placeholder="Nhập thời gian phỏng vấn..." value={formData.time_interview} onChange={(e) => setFormData({ ...formData, time_interview: e.target.value })}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="forminter">Hình thức phỏng vấn</Label>
                    <Select value={formData.form_inter} onValueChange={(value) => setFormData({...formData, form_inter: value})}>
                    <SelectTrigger id="forminter" className="w-full">
                        <SelectValue placeholder="Hình thức" />
                    </SelectTrigger>
                    <SelectContent className="z-9999 w-full">
                        <SelectItem value="Online">Onl</SelectItem>
                        <SelectItem value="Offline">Off</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="humanid">key nhân viên</Label>
                <Input id="humanid" placeholder="Nhập key nhân viên..." value={formData.id_human} onChange={(e) => setFormData({ ...formData, id_human: Number(e.target.value)})}/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="result">Kết quả phỏng vấn</Label>
                <Select value={formData.result} onValueChange={(value) => setFormData({...formData, result: value})}>
                <SelectTrigger id="result" className="w-full">
                    <SelectValue placeholder="Kết quả" />
                </SelectTrigger>
                <SelectContent className="z-9999 w-full">
                    <SelectItem value="Online">Fail</SelectItem>
                    <SelectItem value="Offline">Pass</SelectItem>
                    <SelectItem value="Offline">KTG</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="Notes">Notes</Label>
                <Input id="Notes" placeholder="Nhập notes..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value})}/>
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
