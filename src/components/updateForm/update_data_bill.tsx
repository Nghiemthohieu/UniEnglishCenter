"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Position } from "@/JSON/position";
import { Office } from "@/JSON/office";
import dayjs from "dayjs";
import { Human } from "@/JSON/getAllHuman";
import { HumanNICCreate } from "@/JSON/createHuman";
import { HumanNICupdate, Humanupdate, Team } from "@/JSON/updateHuman";
import { updateHuman } from "@/lib/human/updateHuman";
import { useAllHumans } from "@/hook/human/getallhuman";
import { Bill, BillIMG, Courses, CoursesId, CustomerSource, getBill, PaymentForm } from "@/JSON/bill";
import { updateBill } from "@/lib/bill/updatebill";
import { Checkbox } from "../ui/checkbox";

type Props = {
  bill: getBill | null;
  billimg: BillIMG[];
  onClose: () => void;
  customer_sources: CustomerSource[];
  payment_forms: PaymentForm[];
  offices: Office[];
  courseall: Courses[]; // Chứa đầy đủ thông tin của Courses
  setTriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateDataBill({
  bill,
  billimg,
  onClose,
  customer_sources,
  payment_forms,
  courseall,
  offices,
  setTriggerFetch,
}: Props) {
  const [registrationDate, setRegistrationDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedBirthday, setSelectedBirthday] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [formData, setFormData] = React.useState<getBill | null>(null);

  // Các state cho dropdown nếu bạn không cập nhật trực tiếp vào formData
  const [officeId, setOfficeId] = React.useState("");
  const [customerSourceId, setCustomerSourceId] = React.useState("");
  const [paymentFormId, setPaymentFormId] = React.useState("");
  // Nếu bạn muốn lưu các trường này vào formData thì có thể dùng formData.office, formData.customer_source, v.v.

  // Các state cho các input không thuộc formData nếu cần
  const [payMoney, setPayMoney] = React.useState("");
  const [totalTuition, setTotalTuition] = React.useState("");
  const [paymentNum, setPaymentNum] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Note, setNote] = React.useState("");

  React.useEffect(() => {
    if (bill) {
      setFormData(bill);
      setRegistrationDate(dayjs(bill.registration_date));
      setSelectedBirthday(dayjs(bill.birth_day));
      // Nếu muốn đồng bộ các state ngoài formData:
      setPayMoney(String(bill.pay_money));
      setTotalTuition(String(bill.total_tuition));
      setPaymentNum(String(bill.payment_num));
      setEmail(bill.email);
      setNote(bill.note);
      setOfficeId(bill.office.ID.toString());
      setCustomerSourceId(bill.customer_source.ID.toString());
      setPaymentFormId(bill.payment_form.ID.toString());
    }

    if (billimg && billimg.length > 0) {
      // Tạo một hàm để tải tệp từ URL và chuyển đổi thành File
      const fetchFileFromURL = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], url.split("/").pop() || "file.jpg", { type: blob.type });
      };

      // Chuyển đổi các URL thành đối tượng File
      const fetchImages = async () => {
        const files = await Promise.all(
          billimg.map(async (image) => {
            return await fetchFileFromURL(image.img);
          })
        );
        setSelectedImages(files);
      };

      fetchImages();
    }
  }, [bill, billimg]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSelectedImages(files);
  };

  if (!formData) return null;

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async () => {
    // Chuyển đổi mảng Courses thành CoursesId
    const couses: CoursesId[] = formData.courses.map((course) => ({
      ID: course.ID,
    }));

    const billData: Bill = {
      ID: formData.ID,
      name: formData.name,
      id_human: formData.id_human,
      invoice_code: formData.invoice_code,
      pay_money: parseInt(payMoney.toString()), // hoặc Number(payMoney) nếu cần số
      total_tuition: parseInt(totalTuition.toString()), // tương tự
      birth_day: dayjs(selectedBirthday).format("YYYY-MM-DD"),
      registration_date: dayjs(registrationDate).format("YYYY-MM-DD"),
      id_office: Number(officeId), // chuyển sang number
      id_customer_source: Number(customerSourceId),
      id_payment_form: Number(paymentFormId),
      payment_num: parseInt(paymentNum.toString()),
      email: Email,
      phone_number: formData.phone_number,
      note: Note,
      courses: couses, // Truyền mảng CoursesId
    };

    // Chuyển ảnh thành base64
    const base64Images: BillIMG[] = await Promise.all(
      selectedImages.map(async (file) => {
        const base64Image = await toBase64(file);
        return { img: base64Image };
      })
    );

    try {
      await updateBill(billData, base64Images);
      setTriggerFetch((prev) => !prev);
      alert("Sửa hóa đơn thành công!");
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
            <CardTitle className="uppercase drop-shadow-md text-[16px]">
              Cập nhật thông tin hóa đơn
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {/* Input ẩn cho id */}
            <Input
              hidden
              value={formData.ID}
              onChange={(e) => setFormData({ ...formData, ID: Number(e.target.value) })}
            />
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
                <Label htmlFor="idHuman">Key nhân sự</Label>
                <Input
                  id="idHuman"
                  placeholder="Nhập key nhân viên sale..."
                  value={formData.id_human}
                  onChange={(e) => setFormData({ ...formData, id_human: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="grid col-span-5 grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="Nhập số điện thoại..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invoiceCode">Mã hóa đơn</Label>
                  <Input
                    id="invoiceCode"
                    value={formData.invoice_code}
                    onChange={(e) => setFormData({ ...formData, invoice_code: Number(e.target.value) })}
                    placeholder="Nhập mã hóa đơn..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payMoney">Số tiền thanh toán</Label>
                  <Input
                    id="payMoney"
                    value={payMoney}
                    onChange={(e) => setPayMoney(e.target.value)}
                    placeholder="Nhập số tiền thanh toán..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="totalTuition">Tổng học phí</Label>
                  <Input
                    id="totalTuition"
                    value={totalTuition}
                    onChange={(e) => setTotalTuition(e.target.value)}
                    placeholder="Nhập tổng học phí..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentNum">Số lần đóng</Label>
                  <Input
                    id="paymentNum"
                    value={paymentNum}
                    onChange={(e) => setPaymentNum(e.target.value)}
                    placeholder="Số lần đóng tiền..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập Email..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Văn phòng</Label>
                  <Select value={officeId} onValueChange={setOfficeId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn văn phòng" />
                    </SelectTrigger>
                    <SelectContent className="z-9999">
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
                    <SelectContent className="z-9999">
                      {customer_sources.map((cs) => (
                        <SelectItem key={cs.ID} value={cs.ID.toString()}>
                          {cs.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="grid gap-2">
                  <Label>Lộ trình học</Label>
                  <div className="border rounded-md p-2 max-h-48 overflow-y-auto space-y-2">
                    {courseall.map((c) => (
                      <div key={c.ID} className="flex items-center space-x-2">
                        <Checkbox
                          id={`course-${c.ID}`}
                          checked={formData.courses?.some((course) => course.ID === c.ID)}
                          onCheckedChange={(checked: boolean) => {
                            const updatedCourses = checked
                              ? [...formData.courses, c] // Thêm đối tượng c (đầy đủ)
                              : formData.courses.filter((course) => course.ID !== c.ID);

                            setFormData({ ...formData, courses: updatedCourses });
                          }}
                        />
                        <label htmlFor={`course-${c.ID}`} className="ml-2">
                          {c.name}
                        </label>
                      </div>
                    ))}
                  </div>
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
                  value={selectedBirthday}
                  onChange={setSelectedBirthday}
                />
              </LocalizationProvider>
            </div>
            <div className="grid gap-2">
              <Label>Hình thức thanh toán</Label>
              <Select value={paymentFormId} onValueChange={setPaymentFormId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn hình thức thanh toán" />
                </SelectTrigger>
                <SelectContent className="z-9999">
                  {payment_forms.map((pf) => (
                    <SelectItem key={pf.ID} value={pf.ID.toString()}>
                      {pf.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="note">Ghi chú</Label>
              <Input
                id="note"
                value={Note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="images" className="text-lg font-medium">
                Ảnh CCCD
              </Label>
              <div className="relative">
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                >
                  📂 Chọn ảnh CCCD
                </label>
                {selectedImages.length > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedImages.length} ảnh đã chọn)
                  </span>
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
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
