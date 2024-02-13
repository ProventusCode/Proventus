import { Input } from "@/components/ui/input";
import { toPostgresDate } from "@/lib/utils";
import { Column, Row, Table } from "@tanstack/react-table";

import { useEffect, useState } from "react";

interface DataTableCellProps<TData> {
  defaultValue?: string | number;
  getValue: Function;
  row: Row<TData>;
  column: Column<TData>;
  table: Table<TData>;
}
export function DataTableCell<TData>({
  defaultValue,
  getValue,
  row,
  column,
  table,
}: Readonly<DataTableCellProps<TData>>) {
  let initialValue = defaultValue ?? getValue();
  const columnMeta: any = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  return tableMeta?.editedRows[row.id] ? (
    <Input
      value={value}
      onChange={(e) => {
        let newValue = e.target.value;
        if (columnMeta?.type === "datetime-local") {
          const isoDate = new Date(newValue + "Z");
          newValue = toPostgresDate(isoDate);
        }
        setValue(newValue);
      }}
      onBlur={onBlur}
      type={columnMeta?.type || "text"}
    />
  ) : (
    <span>{value}</span>
  );
}
