import { createColumnHelper } from "@tanstack/react-table";
import { DataTableCell } from "@/components/ui/data-table-cell";
import { Submission } from "@/types/contest.types";

const columnHelper = createColumnHelper<Submission>();

export const submissionHeaders = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("user_name", {
    header: "Usuario",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("problem_name", {
    header: "Problema",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("result", {
    header: "Resultado",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("time_consumed", {
    header: "Tiempo",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("memory_consumed", {
    header: "Memoria",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("code_length", {
    header: "Longitud",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("language", {
    header: "Lenguaje",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("submission_date", {
    header: "Fecha",
    cell: DataTableCell,
    meta: {
      type: "datetime-local",
    },
  }),
];
