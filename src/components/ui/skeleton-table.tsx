import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  rows: number;
  columns: number;
  prefix: string;
}

export default function SkeletonTable({
  rows,
  columns,
  prefix,
}: Readonly<SkeletonTableProps>) {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-auto rounded-xl border shadow-lg">
      <Table data-testid={prefix} className="rounded-xl overflow-hidden">
        <TableHeader>
          <TableRow className="bg-muted/50">
            {[...Array(columns)].map((_, index) => (
              <TableHead key={`${prefix}-${index}`} className="px-2 py-3">
                <Skeleton className="h-6 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, rowIndex) => (
            <TableRow key={`${prefix}-${rowIndex}`}>
              {[...Array(columns)].map((_, cellIndex) => (
                <TableCell key={`${prefix}-${cellIndex}`} className="px-2 py-3">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
