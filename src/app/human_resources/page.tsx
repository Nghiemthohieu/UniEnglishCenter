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

const data = [
  {
    id: "1",
    name: "John Doe",
    superior: "Manager",
    position: "Developer",
    office: "New York",
    startword: "2021-06-10",
    hometown: "Los Angeles",
    phonenumber: "123-456-7890",
    birthday: "1990-05-20",
    gender: "Male",
    id_status: "Active",
    mail: "johndoe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    superior: "Director",
    position: "Designer",
    office: "San Francisco",
    startword: "2019-08-15",
    hometown: "Chicago",
    phonenumber: "987-654-3210",
    birthday: "1988-12-10",
    gender: "Female",
    id_status: "Inactive",
    mail: "janesmith@example.com",
  },
  {
    id: "3",
    name: "John Doe",
    superior: "Manager",
    position: "Developer",
    office: "New York",
    startword: "2021-06-10",
    hometown: "Los Angeles",
    phonenumber: "123-456-7890",
    birthday: "1990-05-20",
    gender: "Male",
    id_status: "Active",
    mail: "johndoe@example.com",
  },
  {
    id: "4",
    name: "Jane Smith",
    superior: "Director",
    position: "Designer",
    office: "San Francisco",
    startword: "2019-08-15",
    hometown: "Chicago",
    phonenumber: "987-654-3210",
    birthday: "1988-12-10",
    gender: "Female",
    id_status: "Inactive",
    mail: "janesmith@example.com",
  },
  {
    id: "5",
    name: "John Doe",
    superior: "Manager",
    position: "Developer",
    office: "New York",
    startword: "2021-06-10",
    hometown: "Los Angeles",
    phonenumber: "123-456-7890",
    birthday: "1990-05-20",
    gender: "Male",
    id_status: "Active",
    mail: "johndoe@example.com",
  },
  {
    id: "6",
    name: "Jane Smith",
    superior: "Director",
    position: "Designer",
    office: "San Francisco",
    startword: "2019-08-15",
    hometown: "Chicago",
    phonenumber: "987-654-3210",
    birthday: "1988-12-10",
    gender: "Female",
    id_status: "Inactive",
    mail: "janesmith@example.com",
  },
  {
    id: "1",
    name: "John Doe",
    superior: "Manager",
    position: "Developer",
    office: "New York",
    startword: "2021-06-10",
    hometown: "Los Angeles",
    phonenumber: "123-456-7890",
    birthday: "1990-05-20",
    gender: "Male",
    id_status: "Active",
    mail: "johndoe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    superior: "Director",
    position: "Designer",
    office: "San Francisco",
    startword: "2019-08-15",
    hometown: "Chicago",
    phonenumber: "987-654-3210",
    birthday: "1988-12-10",
    gender: "Female",
    id_status: "Inactive",
    mail: "janesmith@example.com",
  },
  {
    id: "3",
    name: "John Doe",
    superior: "Manager",
    position: "Developer",
    office: "New York",
    startword: "2021-06-10",
    hometown: "Los Angeles",
    phonenumber: "123-456-7890",
    birthday: "1990-05-20",
    gender: "Male",
    id_status: "Active",
    mail: "johndoe@example.com",
  },
  {
    id: "4",
    name: "Jane Smith",
    superior: "Director",
    position: "Designer",
    office: "San Francisco",
    startword: "2019-08-15",
    hometown: "Chicago",
    phonenumber: "987-654-3210",
    birthday: "1988-12-10",
    gender: "Female",
    id_status: "Inactive",
    mail: "janesmith@example.com",
  },
  {
    id: "5",
    name: "John Doe",
    superior: "Manager",
    position: "Developer",
    office: "New York",
    startword: "2021-06-10",
    hometown: "Los Angeles",
    phonenumber: "123-456-7890",
    birthday: "1990-05-20",
    gender: "Male",
    id_status: "Active",
    mail: "johndoe@example.com",
  },
  {
    id: "6",
    name: "Jane Smith",
    superior: "Director",
    position: "Designer",
    office: "San Francisco",
    startword: "2019-08-15",
    hometown: "Chicago",
    phonenumber: "987-654-3210",
    birthday: "1988-12-10",
    gender: "Female",
    id_status: "Inactive",
    mail: "janesmith@example.com",
  },
]

export const columns: ColumnDef<typeof data[number]>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Họ tên",
    enableHiding: false,
  },
  {
    accessorKey: "superior",
    header: "Cấp Trên",
  },
  {
    accessorKey: "position",
    header: "Chức vụ",
    enableHiding: false,
  },
  {
    accessorKey: "office",
    header: "Văn phòng",
    enableHiding: false,
  },
  {
    accessorKey: "startword",
    header: "Ngày làm việc",
  },
  {
    accessorKey: "hometown",
    header: "Quê",
  },
  {
    accessorKey: "phonenumber",
    header: "SĐT",
  },
  {
    accessorKey: "birthday",
    header: "Sinh nhật",
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
  },
  {
    accessorKey: "id_status",
    header: "Trạng thái",
    enableHiding: false,
  },
  {
    accessorKey: "mail",
    header: "Email",
  },
  {
    id: "actions",
    header: "Thao tác",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="icon" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" className="text-red-500">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
]
export default function HummanResources() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [addExit, setAddExit] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState("")
  const [selectedStartDate, setSelectedStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedBirday, setSelectedBirday] = React.useState<dayjs.Dayjs | null>(null);
  const items = ["Team", "Billing", "Account", "Deployments", "Support", "Supports"]

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
      id: true,
      name: true,
      superior: true,
      position: true,
      office: true,
      startword: true,
      hometown: false,
      phonenumber: false,
      birthday: false,
      gender:false,
      id_status: true,
      mail: false,
  })

  const columnLabels: Record<string, string> = {
      id: "Mã nhân viên",
      name: "Họ và Tên",
      superior: "Cấp trên",
      position: "Chức vụ",
      office: "Văn phòng",
      startword: "Ngày bắt đầu",
      hometown: "Quê quán",
      phonenumber: "Số điện thoại",
      birthday: "Ngày sinh",
      gender: "Giới tính",
      id_status: "Trạng thái",
      mail: "Email",
      actions: "Thao tác",
      }
  
  const [filter, setFilter] = React.useState("")
  const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0, // Trang hiện tại (bắt đầu từ 0)
      pageSize: 10, // Số dòng trên mỗi trang
  })
  const filteredData = React.useMemo(() => {
      return data.filter((employee) =>
      Object.values(employee).some((value) =>
          String(value).toLowerCase().includes(filter.toLowerCase())
      )
      )
  }, [filter, data])
  
  const table = useReactTable({
      data: filteredData,
      columns,
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: { sorting, columnVisibility, pagination },
  })

  const onclickAddExit = () => {
      setAddExit(!addExit);
  };

  return (
    <div className="p-[10px] relative h-full">
      <h1 className="uppercase text-black font-bold h-[4.6rem] text-[1.5rem] flex items-center drop-shadow-lg">Nhân sự</h1>
      <div>
        <Card className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
          <CardHeader>
              <CardTitle className="text-xl uppercase">Danh sách nhân sự</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Input
              placeholder="Search..."
              className="max-w-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              />
              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="ml-auto cursor-pointer" onClick={onclickAddExit}>
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto cursor-pointer">
                      Columns <ChevronDown />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* Cột có enableHiding: false - Đưa lên đầu */}
                    {table.getAllColumns()
                        .filter(column => column.getCanHide() === false)
                        .map((column) => (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            disabled={true} // Không thể ẩn/hiện
                        >
                            {columnLabels[column.id] || column.id} {/* Đổi tên hiển thị */}
                        </DropdownMenuCheckboxItem>
                        ))
                    }

                    {/* Cột có thể ẩn/hiện */}
                    {table.getAllColumns()
                        .filter(column => column.getCanHide() !== false)
                        .map((column) => (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value:boolean) => column.toggleVisibility(!!value)}
                        >
                            {columnLabels[column.id] || column.id}
                        </DropdownMenuCheckboxItem>
                        ))
                    }
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
              <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                          {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                      ))}
                  </TableRow>
                  ))}
              </TableHeader>
              <TableBody>
                  {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                      ))}
                      </TableRow>
                  ))
                  ) : (
                  <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                      </TableCell>
                  </TableRow>
                  )}
              </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                Previous
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {addExit && (
            <div className="fixed top-0 left-0 bottom-0 right-0 z-99 w-full h-full flex justify-center items-center addPerson">
                <div className="bg-[#cfcfcf3b] w-full h-full" onClick={onclickAddExit}></div>
                <div className="fixed z-999">
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