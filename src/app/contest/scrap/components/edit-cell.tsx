import { Button } from "@/components/ui/button";
import { Row, Table } from "@tanstack/react-table";
import { MouseEvent } from "react";

interface EditCellProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

export function EditCell<TData>({
  row,
  table,
}: Readonly<EditCellProps<TData>>) {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    meta?.setEditedRows((old) => {
      return {
        ...old,
        [row.id]: !old[row.id],
      };
    });
  };

  return meta?.editedRows[row.id] ? (
    <Button onClick={setEditedRows}>Save</Button>
  ) : (
    <Button onClick={setEditedRows}>Edit</Button>
  );
}
