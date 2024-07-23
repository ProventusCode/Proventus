import { Button } from "@/components/ui/button";
import { Row, Table } from "@tanstack/react-table";
import { PencilRuler, Save } from "lucide-react";
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
    <Button variant="outline" onClick={setEditedRows}>
      <Save />
    </Button>
  ) : (
    <Button variant="outline" onClick={setEditedRows}>
      <PencilRuler />
    </Button>
  );
}
