import { ColumnPinning, type Column } from "@tanstack/react-table";
import { SortAsc, SortDesc } from "lucide-react";
import { Button } from "~/components/ui/button";

export function DataTableColumnHeader<TData, TValue>({
  column,
  header,
}: {
  column: Column<TData, TValue>;
  header: string;
}) {
  const hasSorted = column.getIsSorted() !== false;
  return (
    <div
      className="flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer items-center"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header}
      {hasSorted &&
        (column.getIsSorted() === "asc" ? (
          <SortAsc className="size-4" />
        ) : (
          <SortDesc className="size-4" />
        ))}
    </div>
  );
}
