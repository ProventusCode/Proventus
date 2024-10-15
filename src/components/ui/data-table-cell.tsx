import { Input } from "@/components/ui/input";
import { Column, Row, Table } from "@tanstack/react-table";

import { DateUtils } from "@/utils/DateUtils";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateTimePicker } from "./date-time-picker.ext";
import { FloatingLabelInput } from "./floating-input.ext";
import MultipleSelector, {
  Option,
  optionsToString,
  stringToOptions,
} from "./multiple-selector.ext";
import { StringUtils } from "@/utils/StringUtils";

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
  const initialValue = defaultValue ?? getValue();
  const columnMeta: any = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  if (columnMeta?.customComponent || columnMeta?.type === "dialog") {
    return columnMeta.customComponent(
      row.original,
      value,
      setValue,
      onBlur
    );
  }

  if (!tableMeta?.editedRows[row.id]) {
    return columnMeta?.customStyle ? columnMeta.customStyle(value) : value;
  }

  if (columnMeta?.type === "datetime-local") {
    return (
      <DateTimePicker
        value={new Date(value)}
        locale={es}
        displayFormat={{ hour24: "yyyy-MM-dd HH:mm:ss" }}
        onChange={(date: Date | undefined) => {
          setValue(DateUtils.toPostgresDate(date) ?? "");
        }}
        onBlur={onBlur}
      />
    );
  }
  // if (columnMeta?.type === "select") {
  //   return (
  //     <Select required={true} onValueChange={setValue}>
  //       <SelectTrigger>
  //         <SelectValue id="platform" />
  //       </SelectTrigger>
  //       <SelectContent>
  //         {Object.entries(PlatformEnum).map(([key, value]) => (
  //           <SelectItem key={key} value={value}>
  //             {value}
  //           </SelectItem>
  //         ))}
  //       </SelectContent>
  //     </Select>
  //   );
  // }
  if (columnMeta?.type === "multi-select") {
    return (
      <MultipleSelector
        defaultOptions={columnMeta.options}
        value={stringToOptions(value)}
        onChange={(options: Option[]) => {
          setValue(optionsToString(options));
        }}
        onBlur={onBlur}
      />
    );
  }
  if (columnMeta?.type === "double-input") {
    const [attempts, submitTime] = value.split("/");
    return (
      <>
        <FloatingLabelInput
          value={attempts}
          onChange={(e) => {
            setValue(`${e.target.value}/${submitTime}`);
          }}
          onBlur={onBlur}
          type="number"
          label="Intentos"
        />
        <FloatingLabelInput
          value={submitTime}
          onChange={(e) => {
            setValue(`${attempts}/${e.target.value}`);
          }}
          onBlur={onBlur}
          type="number"
          label="Tiempo (min)"
        />
      </>
    );
  }
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={onBlur}
      type={columnMeta?.type || "text"}
    />
  );
}
