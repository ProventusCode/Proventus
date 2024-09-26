import { DataTableCell } from "@/components/ui/data-table-cell";
import { ProblemStatistic } from "@/db/schema/contestStanding";
import { ContestStandingType } from "@/types/contest.types";
import { createColumnHelper } from "@tanstack/react-table";
import { Clock, FileX } from "lucide-react";
import { EditCell } from "./edit-cell";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { StringUtils } from "@/utils/StringUtils";
import { Icons } from "@/components/ui/icons";

const columnHelper = createColumnHelper<ContestStandingType>();

const standingsHeaders = [
  columnHelper.accessor("rank", {
    header: "Rank",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("userName", {
    header: "Equipo",
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
  columnHelper.accessor("universityName", {
    header: "Universidad",
    cell: DataTableCell,
    meta: {
      type: "string",
      customStyle: (value: string) => {
        if (StringUtils.isEmptyString(value)) {
          return <Icons.Spinner className="ml-6 h-6 w-6 animate-spin" />;
        }
        return <Badge variant="secondary">{value}</Badge>;
      },
    },
  }),
  columnHelper.accessor("problemsSolved", {
    header: "Puntaje",
    cell: DataTableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("totalTime", {
    header: "Tiempo total",
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

export function setProblemsStatsHeaders(problemStatistic: ProblemStatistic[]) {
  if (standingsHeaders.length > 6) {
    return;
  }
  problemStatistic.forEach((problem) => {
    const statsColumn = columnHelper.accessor(
      (row) => {
        const stats = row.problemStatistics.find(
          (problemStat) => problemStat.index === problem.index
        );
        return `${stats?.attempts}/${stats?.submitTime}`;
      },
      {
        header: problem.index,
        cell: DataTableCell,
        meta: {
          type: "double-input",
          customStyle: (value: string) => {
            const [attempts, submitTime] = value.split("/");
            return (
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center justify-items-center">
                  <FileX />
                  <span>{attempts}</span>
                </div>
                <div className="flex gap-2 items-center justify-items-center">
                  <Clock className="text-gray-500" />
                  <span>{submitTime}</span>
                </div>
              </div>
            );
          },
        },
      }
    );
    standingsHeaders.push(statsColumn);
  });
}

export function getStandingsHeaders() {
  return standingsHeaders;
}
