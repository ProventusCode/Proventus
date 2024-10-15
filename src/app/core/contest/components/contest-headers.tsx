import { DataTableCell } from "@/components/ui/data-table-cell";
import { ContestType } from "@/types/contest.types";
import { createColumnHelper } from "@tanstack/react-table";
import { SquareArrowOutUpRight, Users2 } from "lucide-react";
import Link from "next/link";

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
    },
  }),
  columnHelper.accessor("endDate", {
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
  columnHelper.accessor("participants", {
    header: () => <Users2 />,
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.display({
    id: "view",
    cell: (props) => {
      const data = props.row.original;
      return (
        <Link href={`/core/contest/${data.platform}/${data.contestId}`}>
          <SquareArrowOutUpRight />
        </Link>
      );
    },
  }),
];

export function getContestHeaders() {
  return contestHeaders;
}
