import { Button } from "@/components/ui/button";
import { Row, Table } from "@tanstack/react-table";
import { Edit2, Save } from "lucide-react";
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

  return (
    <Button
      variant="ghost"
      className="text-muted-foreground hover:bg-muted hover:text-primary"
      onClick={setEditedRows}
    >
      {meta?.editedRows[row.id] ? (
        <Save className="w-5 h-5" />
      ) : (
        <Edit2 className="w-5 h-5" />
      )}
    </Button>
  );
}
