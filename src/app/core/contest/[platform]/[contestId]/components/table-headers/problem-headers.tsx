import { Badge } from "@/components/ui/badge";
import { DataTableCell } from "@/components/ui/data-table-cell";
import { ProblemType } from "@/types/contest.types";
import { createColumnHelper } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { getTags } from "../../actions";
import { EditCell } from "./edit-cell";
import { ExportAsExcel } from "react-export-table";
import ExportButton from "./export-button";

const columnHelper = createColumnHelper<ProblemType>();

const problemHeaders = [
  columnHelper.accessor("index", {
    header: "#",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        return <Badge variant="outline">{value}</Badge>;
      },
    },
  }),
  columnHelper.accessor("name", {
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
  columnHelper.accessor("timeLimit", {
    header: "Tiempo límite (s)",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("memoryLimit", {
    header: "Memoria límite (mb)",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: DataTableCell,
    meta: {
      type: "multi-select",
      options: [],
      customStyle: (value: string) => {
        return value?.split(",").map((tag, i) => (
          <Badge key={`${tag}-${i}`} variant="secondary">
            {tag}
          </Badge>
        ));
      },
    },
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
    cell: DataTableCell,
    meta: {
      type: "number",
      customStyle: (value: number) => {
        return value ? (
          <span className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {value}
          </span>
        ) : (
          value
        );
      },
    },
  }),
  columnHelper.accessor("author", {
    header: "Autor",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.display({
    header: ExportButton,
    enableSorting: false,
    id: "edit",
    cell: EditCell,
  }),
];

export async function setProblemTags() {
  const tags = await getTags();

  const tagsColumn = problemHeaders.find((header) => header.header === "Tags");
  const columnMeta: any = tagsColumn?.meta;
  if (columnMeta) {
    columnMeta.options = tags;
  }
}

export function getProblemHeaders() {
  return problemHeaders;
}
