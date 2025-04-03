"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export function DemoReportAnIssue() {
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState("")
  const [selectedStartDate, setSelectedStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedBirday, setSelectedBirday] = React.useState<dayjs.Dayjs | null>(null);
  const items = ["Team", "Billing", "Account", "Deployments", "Support", "Supports"]

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="uppercase">Thêm nhân sự</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="subject" placeholder="Nhập họ tên..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 z-999">
            <Label htmlFor="area">Cấp trên</Label>
            <Select onValueChange={(val) => setSelected(val)}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Cấp trên" />
              </SelectTrigger>
              <SelectContent className="p-2 z-999 cursor-pointer">
                {/* Ô tìm kiếm */}
                <Input
                  placeholder="Search..."
                  className="mb-2 p-2 border border-gray-300 rounded-md"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()} // Chặn auto select khi nhập
                />
                {/* Danh sách SelectItem đã lọc */}
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm p-2">No results found</div>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Chức vụ</Label>
            <Select defaultValue="">
              <SelectTrigger id="area" className="w-full cursor-pointer">
                <SelectValue placeholder="Chức vụ" />
              </SelectTrigger>
              <SelectContent className="z-999 cursor-pointer">
                <SelectItem value="1">Trưởng Phòng Kinh doanh</SelectItem>
                <SelectItem value="2">Trưởng nhóm kinh doanh</SelectItem>
                <SelectItem value="3">Chuyên viên kinh doanh</SelectItem>
                <SelectItem value="4">Nhân viên Kinh Doanh</SelectItem>
                <SelectItem value="5">Thực tập sinh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="office">Văn phòng</Label>
            <Select defaultValue="">
              <SelectTrigger id="area" className="w-full cursor-pointer">
                <SelectValue placeholder="Văn phòng" />
              </SelectTrigger>
              <SelectContent className="z-999 cursor-pointer">
                <SelectItem value="1">Nguyễn Hoàng</SelectItem>
                <SelectItem value="2">Thanh Xuân</SelectItem>
                <SelectItem value="3">Hai BÀ Trưng</SelectItem>
                <SelectItem value="4">Trần Quốc Hoàn</SelectItem>
                <SelectItem value="5">Hoàng Mai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="office">Giới tính</Label>
            <Select defaultValue="">
              <SelectTrigger id="area" className="w-full cursor-pointer">
                <SelectValue placeholder="Giới tính" />
              </SelectTrigger>
              <SelectContent className="z-999 cursor-pointer">
                <SelectItem value="1">Nam</SelectItem>
                <SelectItem value="2">Nữ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 justify-center items-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày bắt đầu"
                value={selectedStartDate}
                onChange={(newValue) => setSelectedStartDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="grid gap-2 justify-center items-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày sinh nhật"
                value={selectedBirday}
                onChange={(newValue) => setSelectedBirday(newValue)}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="hometown">Quê quán</Label>
            <Input id="subject" placeholder="Nhập quê quán..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phonnumber">SĐT</Label>
            <Input id="subject" placeholder="Nhập số điện thoại..." />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mail">Email</Label>
          <Input id="mail" placeholder="Nhập Email..." />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}