import { Badge } from "@/components/ui/badge";
import { DataTableCell } from "@/components/ui/data-table-cell";
import { Icons } from "@/components/ui/icons";
import { SubmissionType } from "@/types/contest.types";
import { StringUtils } from "@/utils/StringUtils";
import { createColumnHelper } from "@tanstack/react-table";
import {
  AlertCircle,
  BanIcon,
  CheckCircle,
  Clock,
  Code,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { EditCell } from "./edit-cell";

const columnHelper = createColumnHelper<SubmissionType>();

const submissionHeaders = [
  columnHelper.accessor("userName", {
    header: "Usuario",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        return (
          <div className="flex flex-col items-center">
            <Image
              width={50}
              height={50}
              src={`https://api.dicebear.com/9.x/identicon/svg?seed=${value}`}
              alt={value}
              className="rounded-full"
            />
            <span className="mt-2">{value}</span>
          </div>
        );
      },
    },
  }),
  columnHelper.accessor("problemIndex", {
    header: "Problema",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        return <Badge variant="outline">{value}</Badge>;
      },
    },
  }),
  columnHelper.accessor("result", {
    header: "Resultado",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        let badgeVariant:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "success" = "outline";
        let icon = null;
        switch (value) {
          case "RUNTIME_ERROR":
            badgeVariant = "destructive";
            icon = <AlertCircle className="w-4 h-4 mr-1" />;
            break;
          case "COMPILATION_ERROR":
            badgeVariant = "secondary";
            icon = <Code className="w-4 h-4 mr-1" />;
            break;
          case "WRONG_ANSWER":
            badgeVariant = "destructive";
            icon = <FileText className="w-4 h-4 mr-1" />;
            break;
          case "ACCEPTED":
            badgeVariant = "default";
            icon = <CheckCircle className="w-4 h-4 mr-1" />;
            break;
          case "TIME_LIMIT_EXCEEDED":
            icon = <Clock className="w-4 h-4 mr-1" />;
            break;
        }
        return (
          <Badge variant={badgeVariant}>
            {icon}
            {value}
          </Badge>
        );
      },
    },
  }),
  columnHelper.accessor("timeConsumed", {
    header: "Tiempo (ms)",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("memoryConsumed", {
    header: "Memoria (kb)",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("codeLength", {
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
      customStyle: (value: string) => {
        const size = "w-12 h-12";
        const languagesMap: Record<string, JSX.Element> = {
          C: <Icons.C className={size} />,
          CPP: <Icons.Cpp className={size} />,
          JAVA: <Icons.Java className={size} />,
          PYTHON: <Icons.Python className={size} />,
        };
        return (
          <div className="flex flex-col items-center">
            {value in languagesMap ? (
              languagesMap[value]
            ) : (
              <BanIcon className={size} />
            )}
            <span className="mt-2">{StringUtils.capitalize(value)}</span>
          </div>
        );
      },
    },
  }),
  columnHelper.accessor("submissionDateTime", {
    header: "Fecha",
    cell: DataTableCell,
    meta: {
      type: "datetime-local",
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

export function getSubmissionHeaders() {
  return submissionHeaders;
}
