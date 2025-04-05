"use client"

import * as React from "react"
import {
  ColumnDef,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Pencil, Trash, Plus, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TableDataHuman from "@/components/table_data_human"
import { useAllHumans } from "@/hook/human/getallhuman"
import { Position } from "@/JSON/position"
import { fetchAllPositions } from "@/lib/position/getdataposition"
import { Office } from "@/JSON/office"
import { fetchAllOffice } from "@/lib/office/getdataoffice"

export default function HummanResources() {
  const [addExit, setAddExit] = React.useState(false)
  const [selectedStartDate, setSelectedStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedBirday, setSelectedBirday] = React.useState<dayjs.Dayjs | null>(null);
  const { allHumans, loading } = useAllHumans();
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [name, setName] = React.useState('');
  const [positionId, setPositionId] = React.useState('');
  const [officeId, setOfficeId] = React.useState('');
  const [hometown, setHometown] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('Nam');
  const [selectedTeams, setSelectedTeams] = React.useState<number[]>([]);
  console.log("date", selectedStartDate?.format('YYYY-MM-DD') || 'No date selected');
  console.log("img: ",selectedImages)
  console.log("name: ",name)
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [office, setOffices] = React.useState<Office[]>([]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchAllPositions();
        setPositions(data);
      } catch (error) {
        console.error('Failed to fetch positions:', error);   
      }
    };

    fetchdata();
  }, []);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchAllOffice();
        setOffices(data);
      } catch (error) {
        console.error('Failed to fetch offices:', error);   
      }
    };

    fetchdata();
  }, []);

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSelectedImages(files);
  };

  const onclickAddExit = () => {
      setAddExit(!addExit);
      setSelectedImages([])
  };

  return (
    <div className="p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Nhân sự</h1>
      <div>
        {loading ? (
          <div className="mx-auto h-full w-full max-w-sm rounded-md border border-blue-300 p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-2 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <TableDataHuman onClick={onclickAddExit} data={allHumans}/>
        )}
        {addExit && (
            <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
                <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onclickAddExit}></div>
                <div className="fixed z-999">
                  <Card className="">
                    <CardHeader>
                      <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm nhân sự</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Họ tên</Label>
                        <Input id="subject" placeholder="Nhập họ tên..." value={name} onChange={handleChange}/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2 z-999">
                          <Label htmlFor="area">Cấp trên</Label>
                          <Input id="team" placeholder="Nhập mã cấp trên..."/>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="position">Chức vụ</Label>
                          <Select defaultValue="">
                            <SelectTrigger id="area" className="w-full cursor-pointer">
                              <SelectValue placeholder="Chức vụ" />
                            </SelectTrigger>
                            <SelectContent className="z-999 cursor-pointer">
                              {
                                positions?.map((position, index) => (
                                  <SelectItem key={index} value={(position.ID.toString())}>
                                    {position.name}
                                  </SelectItem>
                                ))
                              }
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
                              {
                                office?.map((office, index) => (
                                  <SelectItem key={index} value={(office.ID.toString())}>
                                    {office.name}
                                  </SelectItem>
                                ))
                              }
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
                              <SelectItem value="Nam">Nam</SelectItem>
                              <SelectItem value="Nữ">Nữ</SelectItem>
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
                      <div className="grid gap-2">
                        <Label htmlFor="images" className="text-lg font-medium">Ảnh CCCD</Label>

                        <div className="relative">
                          <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultipleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="images" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
                            📂 Chọn ảnh CCCD
                          </label>
                          {selectedImages.length > 0 && (
                            <span className="ml-2 text-sm text-gray-600">({selectedImages.length} ảnh đã chọn)</span>
                          )}
                        </div>

                        {selectedImages.length > 0 && (
                          <div className="mt-2 grid grid-cols-4 gap-2">
                            {selectedImages.map((file, index) => (
                              <div key={index} className="relative group w-24 h-24 mt-[10px]">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`preview-${index}`}
                                  className="w-full h-full object-cover rounded-md border border-gray-300 shadow-sm"
                                />
                                <button
                                  onClick={() =>
                                    setSelectedImages(selectedImages.filter((_, i) => i !== index))
                                  }
                                  className="cursor-pointer absolute size-6 top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition transform translate-x-1/2 -translate-y-1/2"
                                >
                                  X
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between space-x-2">
                      <Button variant="ghost" onClick={onclickAddExit}>Cancel</Button>
                      <Button>Submit</Button>
                    </CardFooter>
                  </Card>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}
