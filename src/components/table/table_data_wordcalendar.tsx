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
import { deletePositionById } from "@/lib/position/deletepositon"
import { CreateWordCalendar, WordCalendar } from "@/JSON/wordcalendar"
import { deleteWordCalendarById } from "@/lib/wordcalendat/deletewordcalendar"

type Props = {
  data: WordCalendar[];
  onClose: () => void;
  updateOnClick: (wordcalendar: WordCalendar) => void;
}

export default function TableDataWordCalender({ data ,onClose, updateOnClick}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Di chuyển khai báo columns vào đây
  const columns: ColumnDef<WordCalendar>[] = [
    { accessorKey: "ID", header: "ID", enableHiding: false },
    { accessorKey: "human.ID", header: "ID nhân viên", enableHiding: false },
    { accessorKey: "human.name", header: "Tên nhân viên", enableHiding: false },
    { accessorKey: "date_word", header: "Ngày làm", enableHiding: false },
    { accessorKey: "shift.shift", header: "ca làm", enableHiding: false },
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

  const deleteOnClick = async (WordCalendarid: WordCalendar) => {
      // Hiển thị cảnh báo xác nhận trước khi xóa
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa lịch làm này không?");
      
      if (!confirmDelete) {
        console.log("Quá trình xóa đã bị hủy.");
        return; // Hủy bỏ quá trình xóa nếu người dùng chọn Cancel
      }
    
      try {
        const success = await deleteWordCalendarById(WordCalendarid.ID);
        if (success) {
          console.log("lịch làm đã được xóa thành công.");
          // Cập nhật lại dữ liệu sau khi xóa thành công
        } else {
          console.log("Xóa lịch làm không thành công.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa lịch làm:", error);
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
        String(employee.ID || "").toLowerCase().includes(keyword) ||
        String(employee.date_word || "").toLowerCase().includes(keyword) ||
        String(employee.human?.ID || "").toLowerCase().includes(keyword) ||
        String(employee.human?.name || "").toLowerCase().includes(keyword) ||
        String(employee.shift?.shift || "").toLowerCase().includes(keyword)
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
    state: { sorting, pagination },
  })  

  return (
    <Card className="shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] hover:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl uppercase">Danh sách đăng ký lịch làm</CardTitle>
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
            <Button variant="outline" onClick={onClose}>
              <Plus className="w-4 h-4 mr-2" /> Đăng ký
            </Button>
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
            {table.getFilteredRowModel().rows.length} lịch làm.
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
