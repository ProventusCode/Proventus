"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { Check, FilterIcon } from "lucide-react";
import { useMemo, useState } from "react";

interface CustomColumnMeta {
  filterVariant?: string;
}

interface FilterProps<TData> {
  column: Column<TData, unknown> & { columnDef: { meta?: CustomColumnMeta } };
}

export function FilterCell<TData>({ column }: Readonly<FilterProps<TData>>) {
  const columnFilterValue = (column.getFilterValue() ?? "") as string;
  const [open, setOpen] = useState(false);

  const sortedUniqueValues = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort((a, b) =>
        a > b ? 1 : -1
      ),
    [column.getFacetedUniqueValues(), columnFilterValue]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onDoubleClick={() => column.setFilterValue(null)}
          variant="outline"
          className={cn(
            "w-auto justify-between my-2",
            !columnFilterValue && "text-muted-foreground"
          )}
        >
          {columnFilterValue
            ? sortedUniqueValues.find((value) => value === columnFilterValue)
            : `Buscar (${column.getFacetedUniqueValues().size})`}
          <FilterIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto h-[250px] overflow-y-auto">
        <Command>
          <CommandInput placeholder="..." />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {sortedUniqueValues.map((data) => (
                <CommandItem
                  value={data}
                  key={data}
                  onSelect={(value) => {
                    column.setFilterValue(value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      data === columnFilterValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
