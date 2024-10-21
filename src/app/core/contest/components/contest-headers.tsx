import { DataTableCell } from "@/components/ui/data-table-cell";
import { ContestType } from "@/types/contest.types";
import { createColumnHelper } from "@tanstack/react-table";
import { SquareArrowOutUpRight, Users2 } from "lucide-react";
import Link from "next/link";
import ExportButton from "../[platform]/[contestId]/components/table-headers/export-button";

const columnHelper = createColumnHelper<ContestType>();

const contestHeaders = [
  columnHelper.accessor("contestId", {
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
  columnHelper.accessor("startDate", {
    header: "Inicio",
    cell: DataTableCell,
    meta: {
      type: "datetime-local",
      customStyle: (value: string) => {
        return <div className="w-24">{value}</div>;
      },
    },
  }),
  columnHelper.accessor("endDate", {
    header: "Fin",
    cell: DataTableCell,
    meta: {
      type: "datetime-local",
      customStyle: (value: string) => {
        return <div className="w-24">{value}</div>;
      }
    },
  }),
  columnHelper.accessor("manager", {
    header: "Manager",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("participants", {
    header: () => <Users2 />,
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.display({
    id: "edit",
    header: ExportButton,
    enableSorting: false,
    cell: (props) => {
      const data = props.row.original;
      return (
        <Link
          className="justify-items-center"
          href={`/core/contest/${data.platform}/${data.contestId}`}
        >
          <SquareArrowOutUpRight className="hover:bg-muted hover:text-destructive" />
        </Link>
      );
    },
  }),
];

export function getContestHeaders() {
  return contestHeaders;
}
