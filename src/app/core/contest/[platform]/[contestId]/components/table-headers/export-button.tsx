import { Button } from "@/components/ui/button";
import { DateUtils } from "@/utils/DateUtils";
import { HeaderContext } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useMemo } from "react";
import { ExportAsExcel } from "react-export-table";

export default function ExportButton<TData>(
  props: Readonly<HeaderContext<TData, unknown>>
) {
  const { table } = props;

  const headers = useMemo(() => {
    return table
      .getFlatHeaders()
      .filter((header) => header.id !== "edit")
      .map((header) => header.id);
  }, [table]);

  const data = useMemo(() => {
    return table.getCoreRowModel().rows.map((row) =>
      row
        .getAllCells()
        .filter((cell) => cell.column.id !== "edit")
        .map((cell) => {
          if (cell.id === "edit") return null;
          return cell.getValue();
        })
    );
  }, [table]);

  const reportName = `report-${DateUtils.toPostgresDate(new Date())}`;

  return (
    <ExportAsExcel data={data} headers={headers} fileName={reportName}>
      {(props) => (
        <Button variant="ghost" size="icon" {...props}>
          <Download className="w-7 h-7 hover:bg-muted hover:text-primary" />
        </Button>
      )}
    </ExportAsExcel>
  );
}
