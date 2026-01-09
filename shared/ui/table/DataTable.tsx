import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useDataTableHook } from "./hooks";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  title?: string;
  description?: string;
  initialSorts?: SortingState;
}

export function DataTable<TData, TValue>({
  columns,
  title,
  description,
  initialSorts = [],
}: DataTableProps<TData, TValue>) {
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    setKeyword,
    loading,
    data,
    total,
  } = useDataTableHook<TData>(initialSorts);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: total,
    state: {
      sorting,
      pagination,
    },
  });

  const [search, setSearch] = useState("");

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="flex flex-col space-y-2">
          {/* pagination start */}
          <ButtonGroup>
            <Input
              id="dt-keyword"
              placeholder="Search ..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setKeyword(search);
                }
              }}
              className="h-8"
            />

            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage() || loading}
            >
              <ChevronFirstIcon />
            </Button>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || loading}
            >
              <ChevronLeftIcon />
            </Button>
            <Button variant={"outline"} size={"sm"} className="w-24">
              {data &&
                data.length > 0 &&
                pagination.pageIndex +
                  1 +
                  " dari " +
                  Math.ceil(total / pagination.pageSize)}
            </Button>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || loading}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage() || loading}
            >
              <ChevronLastIcon />
            </Button>
          </ButtonGroup>
          {/* pagination end */}

          {/* table start */}
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No Results
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* table end */}
        </div>
      </CardContent>
    </Card>
  );
}
