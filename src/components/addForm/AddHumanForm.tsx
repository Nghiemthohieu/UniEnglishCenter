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
import { Position } from "@/JSON/position"
import { Office } from "@/JSON/office"
import dayjs from "dayjs"
import { addHuman } from "@/lib/human/addHuman"
import { HumanCreate, HumanNICCreate, TeamCreate } from "@/JSON/createHuman"
import { useAllHumans } from "@/hook/human/getallhuman"

type Props = {
  onClose: () => void;
  positions: Position[];
  offices: Office[];
  setTriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddHumanForm({ onClose, positions, offices, setTriggerFetch }: Props) {
  const [selectedStartDate, setSelectedStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedBirday, setSelectedBirday] = React.useState<dayjs.Dayjs | null>(null);
  const [name, setName] = React.useState('');
  const [positionId, setPositionId] = React.useState('');
  const [officeId, setOfficeId] = React.useState('');
  const [hometown, setHometown] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');
  const [selectedSuperior, setSelectedSuperior] = React.useState<number[]>([]);
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSelectedImages(files);
  };

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handleSubmitUpdate = async () => {
    if (!selectedStartDate || !selectedBirday || !positionId || !officeId) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const team: TeamCreate[] = selectedSuperior.map((id) => ({ id: id }));
  
    const humanData: HumanCreate = {
      name,
      id_position: parseInt(positionId.toString()), // Ensuring proper number conversion
      id_office: parseInt(officeId.toString()),
      id_status: 1,
      start_word: dayjs(selectedStartDate).format("YYYY-MM-DD"),
      birth_day: dayjs(selectedBirday).format("YYYY-MM-DD"),
      hometown,
      phone_number: phone,
      gender: selectedGender,
      email,
      team,
    };
  
    try {
      const base64Images: HumanNICCreate[] = await Promise.all(
        selectedImages.map(async (file) => {
          const base64Image = await toBase64(file);
          return { nic: base64Image };
        })
      );
  
      const response = await addHuman(humanData, base64Images);
      setTriggerFetch((prev) => !prev);
      alert("Thêm nhân sự thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
        <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
        <div className="fixed z-999">
            <Card>
            <CardHeader>
                <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm nhân sự</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Họ tên</Label>
                    <Input id="name" placeholder="Nhập họ tên..." value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2 z-999">
                        <Label htmlFor="superior">Cấp trên</Label>
                        <Input
                            id="superior"
                            placeholder="Nhập mã cấp trên..."
                            value={selectedSuperior.join(',')}
                            onChange={(e) => {
                                const value = e.target.value;
                                const valuesArray = value
                                .split(',')
                                .map(item => item.trim())
                                .filter(item => item !== '') // lọc giá trị rỗng
                                .map(item => Number(item));  // ép kiểu về number

                                setSelectedSuperior(valuesArray); // number[]
                            }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="position">Chức vụ</Label>
                        <Select value={positionId} onValueChange={setPositionId}>
                            <SelectTrigger id="position" className="w-full">
                                <SelectValue placeholder="Chức vụ" />
                            </SelectTrigger>
                            <SelectContent className="z-9999 w-full">
                                {positions?.map((position) => (
                                <SelectItem key={position.ID} value={position.ID.toString()}>
                                    {position.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="office">Văn phòng</Label>
                        <Select value={officeId} onValueChange={setOfficeId}>
                        <SelectTrigger id="office" className="w-full">
                            <SelectValue placeholder="Văn phòng" />
                        </SelectTrigger>
                        <SelectContent className="z-9999 w-full">
                            {offices?.map((o) => (
                            <SelectItem key={o.ID} value={o.ID.toString()}>
                                {o.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Giới tính</Label>
                        <Select value={selectedGender} onValueChange={setSelectedGender}>
                        <SelectTrigger id="gender" className="w-full">
                            <SelectValue placeholder="Giới tính" />
                        </SelectTrigger>
                        <SelectContent className="z-9999 w-full">
                            <SelectItem value="Nam">Nam</SelectItem>
                            <SelectItem value="Nữ">Nữ</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="Ngày bắt đầu"
                        value={selectedStartDate}
                        onChange={setSelectedStartDate}
                        />
                        <DatePicker
                        label="Ngày sinh nhật"
                        value={selectedBirday}
                        onChange={setSelectedBirday}
                        />
                    </LocalizationProvider>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="hometown">Quê quán</Label>
                        <Input id="hometown" value={hometown} onChange={e => setHometown(e.target.value)} placeholder="Nhập quê quán..." />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">SĐT</Label>
                        <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Nhập số điện thoại..." />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập Email..." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="images" className="text-lg font-medium">Ảnh CCCD</Label>
                    <div className="relative">
                        <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
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
                                className="absolute size-6 top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition transform translate-x-1/2 -translate-y-1/2"
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
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitUpdate}>Submit</Button>
            </CardFooter>
            </Card>
        </div>
    </div>
  )
}
