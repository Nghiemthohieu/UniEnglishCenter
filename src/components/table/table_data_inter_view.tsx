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
import { Pencil, Trash, Plus, ChevronDown, Edit } from "lucide-react"

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
import { useDebounce } from "@/hook/Debounce"
import { getInterview, interview } from "@/JSON/interview"
import { deleteInterViewById } from "@/lib/interview/deleteInterView"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"

type Props = {
  data: getInterview[];
  onClick: () => void;
  updateOnClick: (interview: getInterview) => void;
}

export default function TableDataInterView({ data, onClick, updateOnClick}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
      ID: true,
      name: true,
      phone_number: true,
      email: true,
      id_human: true,
      "human.name": true,
      school: false,
      birt_year: false,
      Date_interview: false,
      time_interview: false,
      form_inter: true,
      result: true,
      Notes: false,
    })

  // Di chuyển khai báo columns vào đây
  const columns: ColumnDef<getInterview>[] = [
    { accessorKey: "ID", header: "ID", enableHiding: false },
    { accessorKey: "name", header: "Họ và tên", enableHiding: false },
    { accessorKey: "phone_number", header: "SĐT", enableHiding: false },
    { accessorKey: "email", header: "Email", enableHiding: false },
    { accessorKey: "id_human", header: "Key nhân viên", enableHiding: false },
    { accessorKey: "human.name", header: "Tên nhân viên", enableHiding: false },
    { accessorKey: "school", header: "trường học", enableHiding: false },
    { accessorKey: "birt_year", header: "Năm sinh", enableHiding: false },
    { accessorKey: "Date_interview", header: "Ngày phỏng vấn", enableHiding: false },
    { accessorKey: "time_interview", header: "Thời gian phỏng vấn", enableHiding: false },
    { accessorKey: "form_inter", header: "Hình thức phỏng vấn", enableHiding: false },
    { accessorKey: "result", header: "Kết quả phỏng vấn", enableHiding: false },
    { accessorKey: "Notes", header: "Notes", enableHiding: false },
    {
      id: "actions",
      header: "Thao tác",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button size="icon" variant="outline" className="text-blue-500" onClick={() => updateOnClick(row.original)}>
            <Edit className="w-4 h-4" /> {/* Biểu tượng Edit cho nút Update */}
          </Button>
          <Button size="icon" variant="outline" className="text-red-500" onClick={() => deleteOnClick(row.original)}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const columnLabels: Record<string, string> = {
    ID: "ID",
    name: "Họ và Tên",
    phone_number: "SĐT",
    email: "Email",
    id_human: "key nhân viên",
    "human.name": "Tên nhân viên",
    school: "Trường học",
    birt_year: "Năm sinh",
    Date_interview: "Ngày phỏng vấn",
    time_interview: "Thời gian phỏng vấn",
    form_inter: "Hình thức phỏng vấn",
    result: "kết quả",
    Notes: "Notes",
  }

  const deleteOnClick = async (interview_id: getInterview) => {
      // Hiển thị cảnh báo xác nhận trước khi xóa
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa ứng viên này không?");
      
      if (!confirmDelete) {
        console.log("Quá trình xóa đã bị hủy.");
        return; // Hủy bỏ quá trình xóa nếu người dùng chọn Cancel
      }
    
      try {
        const success = await deleteInterViewById(interview_id.ID);
        if (success) {
          console.log("ứng viên đã được xóa thành công.");
          // Cập nhật lại dữ liệu sau khi xóa thành công
        } else {
          console.log("Xóa ứng viên không thành công.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa ứng viên:", error);
      }
    }; 

  const [filter, setFilter] = React.useState("")
  const debouncedFilter = useDebounce(filter, 300)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const filteredData = React.useMemo(() => {
    if (!debouncedFilter) return data

    const keyword = debouncedFilter.toLowerCase()
    return data.filter((employee) => {
      return (
        String(employee.name || "").toLowerCase().includes(keyword) ||
        String(employee.phone_number || "").toLowerCase().includes(keyword) ||
        String(employee.email || "").toLowerCase().includes(keyword) ||
        String(employee.id_human || "").toLowerCase().includes(keyword) ||
        String(employee.human.name || "").toLowerCase().includes(keyword) ||
        String(employee.school || "").toLowerCase().includes(keyword) ||
        String(employee.birt_year || "").toLowerCase().includes(keyword) ||
        String(employee.date_interview || "").toLowerCase().includes(keyword) ||
        String(employee.time_interview || "").toLowerCase().includes(keyword) ||
        String(employee.form_inter || "").toLowerCase().includes(keyword) ||
        String(employee.result || "").toLowerCase().includes(keyword) ||
        String(employee.ID || "").toLowerCase().includes(keyword)
      )
    })
  }, [debouncedFilter, data])

  const table = useReactTable({
    data: filteredData,
    columns,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting,columnVisibility, pagination },
  })  

  return (
    <Card className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl uppercase">Danh sách phỏng vấn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between gap-4">
          <Input
            placeholder="Tìm kiếm..."
            className="max-w-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClick}>
              <Plus className="w-4 h-4 mr-2" /> Thêm
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Cột hiển thị <ChevronDown />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                {table.getAllColumns()
                    .filter((col) => col.getCanHide() === false)
                    .map((col) => (
                    <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        disabled
                        className="capitalize"
                    >
                        {columnLabels[col.id] || col.id}
                    </DropdownMenuCheckboxItem>
                    ))}
                {table.getAllColumns()
                    .filter((col) => col.getCanHide() !== false)
                    .map((col) => (
                    <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={(val: boolean) => col.toggleVisibility(val)}
                        className="capitalize"
                    >
                        {columnLabels[col.id] || col.id}
                    </DropdownMenuCheckboxItem>
                    ))}
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
                    <TableHead key={header.id} className="text-center">
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
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center h-24">
                    Không có kết quả.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} /{" "}
            {table.getFilteredRowModel().rows.length} Nguồn khách hàng.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Sau
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
