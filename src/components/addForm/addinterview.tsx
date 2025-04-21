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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dayjs from "dayjs"
import { interview } from "@/JSON/interview"
import { time } from "console"
import { addInterView } from "@/lib/interview/addInterView"

type Props = {
  onClose: () => void;
}

export default function AddInterViewForm({ onClose }: Props) {
  const [name, setName] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [humanID, setHumanID] = React.useState('');
  const [school, setSchool] = React.useState('');
  const [birtYear, setBirtYear] = React.useState('');
  const [dateInterview, setDateInterview] = React.useState<dayjs.Dayjs | null>(null);
  const [timeInterview, setTimeInterview] = React.useState('');
  const [formInterview, setFormInterview] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleSubmitUpdate = async () => {
  
    const interviewData: interview = {
        ID: 0,
        name: name,
        phone_number: phonenumber,
        email: email,
        id_human: parseInt(humanID.toString()),
        school: school,
        birt_year: parseInt(birtYear.toString()),
        date_interview: dayjs(dateInterview).format("YYYY-MM-DD"),
        time_interview: timeInterview,
        form_inter: formInterview,
        notes: notes,
        result: "",
    };
  
    try {
      const response = await addInterView(interviewData);
      alert("Thêm lịch phỏng vấn thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
        <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
        <div className="fixed z-999 min-w-[550px]">
            <Card>
            <CardHeader>
                <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm lịch phỏng vấn</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input id="name" placeholder="Nhập tên ứng viên..." value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">SĐT</Label>
                        <Input id="phone" value={phonenumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Nhập số điện thoại..." />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Nhập email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="school">Trường</Label>
                        <Input id="school" value={school} onChange={e => setSchool(e.target.value)} placeholder="Nhập tên trường..." />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="birtyear">Năm sinh</Label>
                        <Input id="birtyear" placeholder="Nhập năm sinh..." value={birtYear} onChange={(e) => setBirtYear(e.target.value)}/>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Ngày phỏng vấn"
                        value={dateInterview}
                        onChange={setDateInterview}
                        />
                    </LocalizationProvider>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="timeinter">Giờ phỏng vấn</Label>
                        <Input id="timeinter" placeholder="Nhập thời gian phỏng vấn..." value={timeInterview} onChange={(e) => setTimeInterview(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="forminter">Hình thức phỏng vấn</Label>
                        <Select value={formInterview} onValueChange={setFormInterview}>
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
                    <Input id="humanid" placeholder="Nhập key nhân viên..." value={humanID} onChange={(e) => setHumanID(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="Notes">Notes</Label>
                    <Input id="Notes" placeholder="Nhập notes..." value={notes} onChange={(e) => setNotes(e.target.value)}/>
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
