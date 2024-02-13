import { createColumnHelper } from "@tanstack/react-table";
import { DataTableCell } from "../../../../components/ui/data-table-cell";

const columnHelper = createColumnHelper<Problem>();

export const problemHeaders = [
  columnHelper.accessor("indicative", {
    header: "#",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("problem_name", {
    header: "Nombre",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("origin", {
    header: "Origen",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("time_limit", {
    header: "Tiempo límite (ms)",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("memory_limit", {
    header: "Memoria límite (kb)",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
];
