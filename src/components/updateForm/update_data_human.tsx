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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Position } from "@/JSON/position"
import { Office } from "@/JSON/office"
import dayjs from "dayjs"
import { Human } from "@/JSON/getAllHuman"
import { HumanNICCreate } from "@/JSON/createHuman"
import { HumanNICupdate, Humanupdate, Team } from "@/JSON/updateHuman"
import { updateHuman } from "@/lib/human/updateHuman"
import { useAllHumans } from "@/hook/human/getallhuman"

type Props = {
  human: Human | null;
  humannic: HumanNICCreate[] | [];
  onClose: () => void;
  positions: Position[];
  offices: Office[];
  setTriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateDataHuman({ human,humannic, onClose, positions, offices, setTriggerFetch }: Props) {
  const [selectedStartDate, setSelectedStartDate] = React.useState<dayjs.Dayjs | null>(null)
  const [selectedBirthday, setSelectedBirthday] = React.useState<dayjs.Dayjs | null>(null)
  const [selectedImages, setSelectedImages] = React.useState<File[]>([])
  const [formData, setFormData] = React.useState<Human | null>(null)
  React.useEffect(() => {
    if (human) {
      setFormData(human);
      setSelectedStartDate(dayjs(human.start_word));
      setSelectedBirthday(dayjs(human.birth_day));
    }
  
    if (humannic && humannic.length > 0) {
      
      // Tạo một hàm để tải tệp từ URL và chuyển đổi thành File
      const fetchFileFromURL = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob(); // Chuyển URL thành blob
        return new File([blob], url.split('/').pop() || 'file.jpg', { type: blob.type });
      };
  
      // Chuyển đổi các URL thành đối tượng File
      const fetchImages = async () => {
        const files = await Promise.all(
          humannic.map(async (image) => {
            return await fetchFileFromURL(image.nic);
          })
        );
        setSelectedImages(files);
      };
  
      fetchImages();
    }
  }, [human, humannic]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      setSelectedImages(files);
    };

  if (!formData) return null

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async () => {
    const team: Team[] = (formData.Team ?? []).map((teamItem) => ({
      id: teamItem.ID,
    }));
    
    const humanData: Humanupdate = {
      id: formData.ID,
      name: formData.name,
      birth_day: dayjs(selectedBirthday).format('YYYY-MM-DD'),
      start_word: dayjs(selectedStartDate).format('YYYY-MM-DD'),
      id_office: formData.office.ID,       // 👈 dùng `office` thay vì `office_id`
      id_position: formData.position.ID,   // 👈 dùng `position` thay vì `position_id`
      id_status: formData.status.ID, //
      gender: formData.gender,
      email: formData.email,
      phone_number: formData.phone_number,
      hometown: formData.hometown,
      team: team,                    // 👈 truyền đúng `Team[]`
    };

    // Chuyển ảnh CMND thành base64
    const base64Images: HumanNICupdate[] = await Promise.all(
      selectedImages.map(async (file) => {
        const base64Image = await toBase64(file);
        return { nic: base64Image }; // Tạo đối tượng { nic: ... } cho mỗi ảnh
      })
    );
  
    try {
      const response = await updateHuman(humanData, base64Images); // Gửi dữ liệu nhân sự và ảnh CMND
      setTriggerFetch((prev) => !prev);
      alert("sửa nhân sự thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
      <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
      <div className="fixed z-999">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Cập nhật thông tin nhân sự
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Input hidden value={formData.ID} 
                onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })} />

            <div className="grid gap-2">
              <Label htmlFor="name">Họ tên</Label>
              <Input
                id="name"
                placeholder="Nhập họ tên..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 z-999">
                <Label htmlFor="superior">Cấp trên</Label>
                <Input
                  id="superior"
                  placeholder="Nhập mã cấp trên..."
                  value={formData.Team?.map(t => t.ID).join(", ") || ""}
                  onChange={(e) => {
                    const values = e.target.value.split(",").map(v => v.trim())
                    setFormData({ ...formData, Team: values.map(id => ({ ID: Number(id) })) })
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">Chức vụ</Label>
                <Select
                  value={formData.position.ID.toString()}
                  onValueChange={(value) => {
                    const selected = positions.find(p => p.ID.toString() === value)
                    if (selected) setFormData({ ...formData, position: selected })
                  }}
                >
                  <SelectTrigger id="position" className="w-full">
                    <SelectValue placeholder="Chức vụ" />
                  </SelectTrigger>
                  <SelectContent className="z-9999 w-full">
                    {positions.map(position => (
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
                <Select
                  value={formData.office.ID.toString()}
                  onValueChange={(value) => {
                    const selected = offices.find(o => o.ID.toString() === value)
                    if (selected) setFormData({ ...formData, office: selected })
                  }}
                >
                  <SelectTrigger id="office" className="w-full">
                    <SelectValue placeholder="Văn phòng" />
                  </SelectTrigger>
                  <SelectContent className="z-9999 w-full">
                    {offices.map(o => (
                      <SelectItem key={o.ID} value={o.ID.toString()}>
                        {o.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
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
                  onChange={(date) => {
                    setSelectedStartDate(date)
                    setFormData({ ...formData, start_word: date?.format("YYYY-MM-DD") || "" })
                  }}
                />
                <DatePicker
                  label="Ngày sinh nhật"
                  value={selectedBirthday}
                  onChange={(date) => {
                    setSelectedBirthday(date)
                    setFormData({ ...formData, birth_day: date?.format("YYYY-MM-DD") || "" })
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hometown">Quê quán</Label>
                <Input
                  id="hometown"
                  placeholder="Nhập quê quán..."
                  value={formData.hometown}
                  onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">SĐT</Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại..."
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Nhập Email..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
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
                        onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
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
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
