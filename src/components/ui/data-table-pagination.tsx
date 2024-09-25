import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Table } from "@tanstack/react-table";
import { Button } from "./button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./pagination";
import { TableCell, TableRow } from "./table";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({
  table,
}: Readonly<TablePaginationProps<TData>>) {
  return (
    <TableRow>
      <TableCell colSpan={table.getAllColumns().length}>
        <Pagination>
          <PaginationContent>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </Button>

            <PaginationItem>
              <PaginationLink className="font-bold">
                {table.getState().pagination.pageIndex + 1}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink>{table.getPageCount()}</PaginationLink>
            </PaginationItem>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon />
            </Button>
          </PaginationContent>
        </Pagination>
      </TableCell>
    </TableRow>
  );
}
