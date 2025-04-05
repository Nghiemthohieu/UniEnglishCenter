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
import { Human } from "@/JSON/getAllHuman"
import { useDebounce } from "@/hook/Debounce"

// export async function getServerSideProps() {
//   return useAllHumans()
// }

type Props = {
    data: Human[];
    onClick: () => void;
  }
  
  export const columns: ColumnDef<Human>[] = [
      { accessorKey: "ID", header: "ID", enableHiding: false },
      { accessorKey: "name", header: "Họ tên", enableHiding: false },
      {
          accessorKey: "team",
          header: "Cấp Trên",
          cell: ({ row }) => {
            const team = row.original.Team;
        
            if (Array.isArray(team) && team.length > 0) {
              return team[0]?.ID ?? "Không có ID"; // Trả về ID của cấp trên nếu có
            } else {
              return "0"; // Nếu không có dữ liệu trong team
            }
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
  ]; 

export default function TableDataHuman({ data,onClick }: Props) {
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
      const debouncedFilter = useDebounce(filter, 500)
      const [pagination, setPagination] = React.useState<PaginationState>({
          pageIndex: 0, // Trang hiện tại (bắt đầu từ 0)
          pageSize: 10, // Số dòng trên mỗi trang
      })
      const filteredData = React.useMemo(() => {
        return data.filter((employee) => {
          const keyword = debouncedFilter.toLowerCase()
          return (
            String(employee.name || "").toLowerCase().includes(keyword) ||
            String(employee.email || "").toLowerCase().includes(keyword) ||
            String(employee.phone_number || "").toLowerCase().includes(keyword) ||
            String(employee.gender || "").toLowerCase().includes(keyword) ||
            String(employee.hometown || "").toLowerCase().includes(keyword) ||
            String(employee.position?.name || "").toLowerCase().includes(keyword) ||
            String(employee.office?.name || "").toLowerCase().includes(keyword) ||
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
                placeholder="Search..."
                className="max-w-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                />
                <div className="flex gap-3 justify-center">
                <Button variant="outline" className="ml-auto cursor-pointer" onClick={onClick}>
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
                            <TableCell key={cell.id} className="items-center text-center">
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
    )
}