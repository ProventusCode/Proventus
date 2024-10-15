import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import TablePagination from "./data-table-pagination";

type Row = Record<string | number | symbol, boolean>;

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: string) => void;
    editedRows: Row;
    setEditedRows: Dispatch<SetStateAction<Row>>;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationSize?: number;
  handleOriginalDataUpdate?: Dispatch<SetStateAction<TData[] | undefined>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationSize,
  handleOriginalDataUpdate,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [editableData, setEditableData] = useState<TData[]>([...data]);
  const [editedRows, setEditedRows] = useState<Row>({});

  const table = useReactTable<TData>({
    data: editableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: paginationSize ?? 5,
      },
    },
    meta: {
      editedRows,
      setEditedRows,
      updateData: function (rowIndex: number, columnId: string, value: string) {
        const newData = (old: TData[] | undefined) =>
          old?.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }) ?? [];
        setEditableData(newData);
        handleOriginalDataUpdate?.(newData);
      },
    },
  });

  return (
    <Table className="rounded-xl table-auto">
      <TableHeader className="bg-gray-50">
        <TableRow>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="text-center font-bold">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="text-center">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center py-4 w-full"
            >
              No se encontró información
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {table.getPageCount() > table.getState().pagination.pageSize && (
        <TableFooter>
          <TablePagination table={table} />
        </TableFooter>
      )}
    </Table>
  );
}
