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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDebounce } from "@/hook/Debounce"
import { Bill, getBill } from "@/JSON/bill"

type Props = {
  data: getBill[]
  onClick: () => void
  updateOnClick: (bill: getBill) => void
  deleteOnClick: (bill: getBill) => void
}

// ✅ Thêm nhãn hiển thị cho dropdown cột
const columnLabels: Record<string, string> = {
  id: "ID",
  registration_date: "Ngày đăng ký",
  name: "Họ tên",
  id_human: "Key nhân viên",
  "human.name": "Tên nhân viên",
  birth_day: "Ngày sinh",
  "customer_source.name": "Nguồn khách hàng",
  email: "Email",
  "office.name": "Cơ sở đăng ký",
  "payment_form.name": "Hình thức thanh toán",
  phone_number: "SĐT",
  invoice_code: "Mã hóa đơn",
  courses: "Lộ trình học",
  pay_money: "Số tiền thanh toán",
  total_tuition: "Tổng tiền khóa học",
  payment_num: "Lần thanh toán",
  note: "Chú thích",
  actions: "Thao tác",
}

export default function TableDataBill({
  data,
  onClick,
  updateOnClick,
  deleteOnClick,
}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [filter, setFilter] = React.useState("")
  const debouncedFilter = useDebounce(filter, 300)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: true,
    registration_date: true,
    name: true,
    id_human: true,
    "human.name": true,
    birth_day: false,
    "customer_source.name": true,
    email: true,
    "office.name": true,
    "payment_form.name": true,
    phone_number: false,
    invoice_code: true,
    courses: true,
    pay_money: true,
    total_tuition: true,
    payment_num: true,
    note: false,
    actions: true,
  })

  const columns: ColumnDef<getBill>[] = [
    { accessorKey: "ID", header: "ID", enableHiding: false },
    { accessorKey: "registration_date", header: "Ngày đăng ký", enableHiding: false },
    { accessorKey: "name", header: "Họ tên", enableHiding: false },
    { accessorKey: "id_human", header: "Key nhân viên", enableHiding: false },
    { accessorKey: "human.name", header: "Tên nhân viên", enableHiding: false },
    { accessorKey: "birth_day", header: "Ngày sinh", enableHiding: false },
    { accessorKey: "customer_source.name", header: "Nguồn khách hàng", enableHiding: false },
    { accessorKey: "email", header: "Email", enableHiding: false },
    { accessorKey: "office.name", header: "Cơ sở đăng ký", enableHiding: false },
    { accessorKey: "payment_form.name", header: "Hình thức thanh toán", enableHiding: false },
    { accessorKey: "phone_number", header: "SĐT", enableHiding: false },
    { accessorKey: "invoice_code", header: "Mã hóa đơn", enableHiding: false },
    {
      accessorKey: "courses",
      header: "Lộ trình học",
      cell: ({ row }) => {
        const courses = row.original.courses
        return Array.isArray(courses) && courses.length > 0
          ? courses.map((course) => course.ID).join(", ")
          : "Không có khóa học"
      },
      enableHiding: false,
    },
    { accessorKey: "pay_money", header: "Số tiền thanh toán", enableHiding: false },
    { accessorKey: "total_tuition", header: "Tổng tiền khóa học", enableHiding: false },
    { accessorKey: "payment_num", header: "Lần thanh toán", enableHiding: false },
    { accessorKey: "note", header: "Chú thích", enableHiding: false },
    {
      id: "actions",
      header: "Thao tác",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button size="icon" variant="outline" className="text-blue-500" onClick={() => updateOnClick(row.original)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline" className="text-red-500" onClick={() => deleteOnClick(row.original)}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  const filteredData = React.useMemo(() => {
    if (!debouncedFilter) return data
    const keyword = debouncedFilter.toLowerCase()
    return data.filter((item) => {
      return (
        String(item.name || "").toLowerCase().includes(keyword) ||
        String(item.email || "").toLowerCase().includes(keyword) ||
        String(item.phone_number || "").toLowerCase().includes(keyword) ||
        String(item.birth_day || "").toLowerCase().includes(keyword) ||
        String(item.invoice_code || "").toLowerCase().includes(keyword) ||
        String(item.note || "").toLowerCase().includes(keyword) ||
        String(item.human?.name || "").toLowerCase().includes(keyword) ||
        String(item.office?.name || "").toLowerCase().includes(keyword) ||
        String(item.customer_source?.name || "").toLowerCase().includes(keyword)
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
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
  })

  return (
    <Card className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl uppercase">Danh sách Hóa đơn</CardTitle>
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
            {table.getFilteredRowModel().rows.length} Hóa đơn.
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
