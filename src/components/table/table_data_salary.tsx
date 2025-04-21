"use client"

import * as React from "react"
import {
  ColumnDef,
  PaginationState,
  SortingState,
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
import { Salary } from "@/JSON/salary"
import { fetchallSalary } from "@/lib/salary/getallSalary"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  onClick: () => void;
}

export default function TableDataSalary({ onClick }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [salary, setSalary] = React.useState<Salary[]>([])
  const [loadSalary, setLoadSalary] = React.useState(true)
  const today = new Date()
  const [month, setMonth] = React.useState<string>(String(today.getMonth() + 1))
  const [year, setYear] = React.useState<string>(String(today.getFullYear()))

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const years = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i)
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await fetchallSalary(2, Number(month), Number(year));
        setSalary(data);
        setLoadSalary(false);
      } catch (error) {
        console.error('Failed to fetch salarys:', error);
      }
    }

    fetchdata()
  }, [month, year])
  const columns: ColumnDef<Salary>[] = [
    { accessorKey: "ID", header: "ID", enableHiding: false },
    { accessorKey: "human.ID", header: "Key nhân viên", enableHiding: false },
    { accessorKey: "human.name", header: "Tên nhân viên", enableHiding: false },
    { accessorKey: "position.acronym", header: "Văn phòng", enableHiding: false },
    { accessorKey: "personal_sales", header: "DS cá nhân", enableHiding: false },
    { accessorKey: "team_sales", header: "DS đội nhóm", enableHiding: false },
    { accessorKey: "personal_sales_salary", header: "Lương DS cá nhân", enableHiding: false },
    { accessorKey: "team_sales_salary", header: "Lương DS Đội nhóm", enableHiding: false },
    { accessorKey: "total_salary", header: "Tổng lương", enableHiding: false },
  ]

  const [filter, setFilter] = React.useState("")
  const debouncedFilter = useDebounce(filter, 300)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const filteredData = React.useMemo(() => {
    if (!debouncedFilter) return salary

    const keyword = debouncedFilter.toLowerCase()
    return salary.filter((employee) => {
      return (
        String(employee.human.ID || "").toLowerCase().includes(keyword) ||
        String(employee.human.name || "").toLowerCase().includes(keyword) ||
        String(employee.positon.acronym || "").toLowerCase().includes(keyword) ||
        String(employee.ID || "").toLowerCase().includes(keyword)
      )
    })
  }, [debouncedFilter, salary])

  const table = useReactTable({
    data: filteredData,
    columns,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, pagination },
  })

  return (
    <Card className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl uppercase">Danh sách Lương</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between gap-4">
          <Input
            placeholder="Tìm kiếm..."
            className="max-w-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="flex gap-3 items-center">
            <Button variant="outline" onClick={onClick}>
              <Plus className="w-4 h-4 mr-2" /> Tạo lương
            </Button>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Tháng" />
              </SelectTrigger>
              <SelectContent className="z-99999">
                {months.map((m) => (
                  <SelectItem key={m} value={String(m)}>
                    Tháng {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Năm" />
              </SelectTrigger>
              <SelectContent className="z-99999">
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    Năm {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {table.getFilteredRowModel().rows.length} chức vụ.
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
