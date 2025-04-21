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
import { Office } from "@/JSON/office"
import dayjs from "dayjs"
import { addHuman } from "@/lib/human/addHuman"
import { HumanCreate, HumanNICCreate, TeamCreate } from "@/JSON/createHuman"
import { Bill, BillIMG, Courses, CoursesId, CustomerSource, getBill, PaymentForm } from "@/JSON/bill"
import { Human } from "@/JSON/getAllHuman"
import { addBill } from "@/lib/bill/addbill"
import { CheckboxIndicator } from "@radix-ui/react-checkbox"
import { Checkbox } from "../ui/checkbox"

type Props = {
  onClose: () => void;
  customer_sources: CustomerSource[];
  payment_forms: PaymentForm[];
  offices: Office[];
  courseall: Courses[];
  setTriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddBillForm({ onClose,courseall, customer_sources,payment_forms, offices, setTriggerFetch }: Props) {
  const [registrationDate, setRegistrationDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedBirday, setSelectedBirday] = React.useState<dayjs.Dayjs | null>(null);
  const [name, setName] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [invoiceCode, setInvoiceCode] = React.useState('');
  const [payMoney, setPayMoney] = React.useState('');
  const [totalTuition, setTotalTuition] = React.useState('');
  const [officeId, setOfficeId] = React.useState('');
  const [customerSourceId, setCustomerSourceId] = React.useState('');
  const [paymentFormId, setPaymentFormId] = React.useState('');
  const [paymentNum, setPaymentNum] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Note, setNote] = React.useState('');
  const [idHuman, setIdHuman] = React.useState('');
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [courses, setCourses] = React.useState<number[]>([]);

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
  
    const couses: CoursesId[] = courses.map((id) => ({ ID: id }));
  
    const billData: Bill = {
        ID: 0,
        name,
        id_human:  parseInt(idHuman.toString()),
        invoice_code: parseInt(invoiceCode.toString()), // Ensuring proper number conversion
        id_office: parseInt(officeId.toString()),
        pay_money: parseInt(payMoney.toString()),
        registration_date: dayjs(registrationDate).format("YYYY-MM-DD"),
        birth_day: dayjs(selectedBirday).format("YYYY-MM-DD"),
        total_tuition: parseInt(totalTuition.toString()),
        phone_number: phonenumber,
        id_customer_source: parseInt(customerSourceId.toString()),
        id_payment_form: parseInt(paymentFormId.toString()),
        payment_num: parseInt(paymentNum.toString()),
        email: Email,
        note: Note,
        courses: couses,
    };
  
    try {
      const base64Images: BillIMG[] = await Promise.all(
        selectedImages.map(async (file) => {
          const base64Image = await toBase64(file);
          return { img: base64Image };
        })
      );
  
      const response = await addBill(billData, base64Images);
      setTriggerFetch((prev) => !prev);
      alert("Thêm Hóa đơn thành công!");
      onClose();
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      alert("Gửi dữ liệu thất bại");
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
        <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onClose}></div>
        <div className="fixed z-999 min-w-[1000px]">
            <Card>
                <CardHeader>
                    <CardTitle className="uppercase drop-shadow-md text-[16px]">Thêm hóa đơn</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid-cols-2 grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Họ tên</Label>
                            <Input id="name" placeholder="Nhập họ tên..." value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="idHuman">Key nhân sự</Label>
                            <Input id="idHuman" placeholder="Nhập key nhân viên sale..." value={idHuman} onChange={(e) => setIdHuman(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-5 grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input id="phone" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} placeholder="Nhập số điện thoại..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="invoiceCode">Mã hóa đơn</Label>
                                <Input id="invoiceCode" value={invoiceCode} onChange={(e) => setInvoiceCode(e.target.value)} placeholder="Nhập mã hóa đơn..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="payMoney">Số tiền thanh toán</Label>
                                <Input id="payMoney" value={payMoney} onChange={(e) => setPayMoney(e.target.value)} placeholder="Nhập số tiền thanh toán..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="totalTuition">Tổng học phí</Label>
                                <Input id="totalTuition" value={totalTuition} onChange={(e) => setTotalTuition(e.target.value)} placeholder="Nhập tổng học phí..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="paymentNum">Số lần đóng</Label>
                                <Input id="paymentNum" value={paymentNum} onChange={(e) => setPaymentNum(e.target.value)} placeholder="Số lần đóng tiền..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập Email..." />
                            </div>
                            <div className="grid gap-2">
                                <Label>Văn phòng</Label>
                                <Select value={officeId} onValueChange={setOfficeId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn văn phòng" />
                                </SelectTrigger>
                                <SelectContent className="z-99999">
                                    {offices.map((office) => (
                                    <SelectItem key={office.ID} value={office.ID.toString()}>
                                        {office.name}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Nguồn khách hàng</Label>
                                <Select value={customerSourceId} onValueChange={setCustomerSourceId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn nguồn KH" />
                                </SelectTrigger>
                                <SelectContent className="z-99999">
                                    {customer_sources.map((cs) => (
                                    <SelectItem key={cs.ID} value={cs.ID.toString()}>
                                        {cs.name}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2 col-span-1">
                            <Label>Lộ trình học</Label>
                            <div className="border rounded-md p-2 max-h-60 overflow-y-auto space-y-2">
                                {courseall.map((c) => (
                                <div key={c.ID} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`course-${c.ID}`}
                                        checked={courses.includes(c.ID)}
                                        onCheckedChange={(checked: boolean) => {
                                            if (checked) {
                                            setCourses([...courses, c.ID]);
                                            } else {
                                            setCourses(courses.filter((id) => id !== c.ID));
                                            }
                                        }}
                                        />
                                    <label htmlFor={`course-${c.ID}`} className="ml-2">{c.name}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            label="Ngày đăng ký"
                            value={registrationDate}
                            onChange={setRegistrationDate}
                            />
                            <DatePicker
                            label="Ngày sinh"
                            value={selectedBirday}
                            onChange={setSelectedBirday}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="grid gap-2">
                        <Label>Hình thức thanh toán</Label>
                        <Select value={paymentFormId} onValueChange={setPaymentFormId}>
                            <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn hình thức thanh toán" />
                            </SelectTrigger>
                            <SelectContent className="z-99999">
                            {payment_forms.map((pf) => (
                                <SelectItem key={pf.ID} value={pf.ID.toString()}>
                                {pf.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="images" className="text-lg font-medium">Ảnh hóa đơn / CCCD</Label>
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
                            📂 Chọn ảnh
                            </label>
                            {selectedImages.length > 0 && (
                            <span className="ml-2 text-sm text-gray-600">({selectedImages.length} ảnh đã chọn)</span>
                            )}
                        </div>
                        {selectedImages.length > 0 && (
                            <div className="mt-2 grid grid-cols-8 gap-2">
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
                    <div className="grid gap-2">
                        <Label htmlFor="note">Ghi chú</Label>
                        <Input id="note" value={Note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú..." />
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
