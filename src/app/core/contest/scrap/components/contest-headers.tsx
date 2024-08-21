import { createColumnHelper } from "@tanstack/react-table";
import { DataTableCell } from "@/components/ui/data-table-cell";
import { EditCell } from "./edit-cell";
import { Contest } from "@/types/contest.types";

const columnHelper = createColumnHelper<Contest>();

export const contestHeaders = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("platform", {
    header: "Plataforma",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("start_date", {
    header: "Inicio",
    cell: DataTableCell,
    meta: {
      type: "datetime-local",
    },
  }),
  columnHelper.accessor("end_date", {
    header: "Fin",
    cell: DataTableCell,
    meta: {
      type: "datetime-local",
    },
  }),
  columnHelper.accessor("manager", {
    header: "Manager",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("registered_participants", {
    header: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-users-group"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#000000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
      </svg>
    ),
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];
