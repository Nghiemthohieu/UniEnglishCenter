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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Human } from "@/JSON/getAllHuman"
import { useDebounce } from "@/hook/Debounce"
import { deleteHumanById } from "@/lib/human/deleteHuman"

type Props = {
  data: Human[];
  onClick: () => void;
  updateOnClick: (human: Human) => void;
  deleteOnClick: (human: Human) => void;
}

export default function TableDataHuman({ data, onClick, updateOnClick, deleteOnClick }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
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
    gender: false,
    id_status: true,
    mail: false,
  })

  // Di chuyển khai báo columns vào đây
  const columns: ColumnDef<Human>[] = [
    { accessorKey: "ID", header: "ID", enableHiding: false },
    { accessorKey: "name", header: "Họ tên", enableHiding: false },
    {
      accessorKey: "team",
      header: "Cấp Trên",
      cell: ({ row }) => {
        const team = row.original.Team;
        return Array.isArray(team) && team.length > 0
          ? team[0]?.ID ?? "Không có ID"
          : "0";
      },
    },
    { accessorKey: "position.acronym", header: "Chức vụ", enableHiding: false },
    { accessorKey: "office.acronym", header: "Văn phòng", enableHiding: false },
    { accessorKey: "start_word", header: "Ngày làm việc" },
    { accessorKey: "hometown", header: "Quê" },
    { accessorKey: "phone_number", header: "SĐT" },
    { accessorKey: "birth_day", header: "Sinh nhật" },
    { accessorKey: "gender", header: "Giới tính" },
    { accessorKey: "status.name", header: "Trạng thái", enableHiding: false },
    { accessorKey: "mail", header: "Email" },
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
        String(employee.email || "").toLowerCase().includes(keyword) ||
        String(employee.phone_number || "").toLowerCase().includes(keyword) ||
        String(employee.gender || "").toLowerCase().includes(keyword) ||
        String(employee.hometown || "").toLowerCase().includes(keyword) ||
        String(employee.position?.acronym || "").toLowerCase().includes(keyword) ||
        String(employee.office?.acronym || "").toLowerCase().includes(keyword) ||
        String(employee.status?.name || "").toLowerCase().includes(keyword) ||
        String(employee.Team?.[0]?.ID || "").toLowerCase().includes(keyword)
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
    state: { sorting, columnVisibility, pagination },
  })  

  return (
    <Card className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl uppercase">Danh sách nhân sự</CardTitle>
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
            {table.getFilteredRowModel().rows.length} nhân sự.
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
