import { Badge } from "@/components/ui/badge";
import { DataTableCell } from "@/components/ui/data-table-cell";
import { UserInfoDTO } from "@/db/schema/user";
import { RoleEnum } from "@/enums/RoleEnum";
import { createColumnHelper } from "@tanstack/react-table";
import ExportButton from "app/core/contest/[platform]/[contestId]/components/table-headers/export-button";
import { EditCell } from "./edit-cell";
import { DateUtils } from "@/utils/DateUtils";

const columnHelper = createColumnHelper<UserInfoDTO>();

const roleMap: Record<string, string> = {
  [RoleEnum.ADMIN]: "Admin",
  [RoleEnum.PROFESSOR]: "Profesor",
  [RoleEnum.STUDENT]: "Estudiante",
};

const bgMap: Record<string, string> = {
  [RoleEnum.ADMIN]: "bg-red-300",
  [RoleEnum.PROFESSOR]: "bg-yellow-300",
  [RoleEnum.STUDENT]: "bg-green-300",
};

const userHeaders = [
  columnHelper.accessor("createdAt", {
    header: "Fecha registro",
    enableColumnFilter: false,
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        return <pre>{DateUtils.toPostgresDate(Date.parse(value))}</pre>;
      },
    },
  }),
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        return value ? <Badge variant="outline"> {value}</Badge> : value;
      },
    },
  }),
  columnHelper.accessor("email", {
    header: "Correo",
    cell: DataTableCell,
    meta: {
      type: "string",
    },
  }),
  columnHelper.accessor("university.name", {
    header: "Universidad",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        return value ? <Badge variant="outline"> {value}</Badge> : value;
      },
    },
  }),
  columnHelper.accessor("userRole.role", {
    header: "Rol",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: number) => {
        return value ? (
          <Badge variant="outline" className={bgMap[value]}>
            {roleMap[value]}
          </Badge>
        ) : (
          value
        );
      },
    },
  }),
  columnHelper.display({
    id: "edit",
    header: ExportButton,
    cell: EditCell,
    enableSorting: false,
    enableColumnFilter: false,
  }),
];

export function getUserHeaders() {
  return userHeaders;
}
