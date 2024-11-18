import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn, getMonths } from "~/common/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

export default function MonthlyMenu({
  defaultValue,
  setMonth,
}: {
  defaultValue?: number;
  setMonth: Dispatch<SetStateAction<number | undefined>>;
}) {
  const months = getMonths();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (defaultValue) {
      setSelected(String(defaultValue));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (selected) {
      setMonth(Number(selected));
    }
  }, [selected, setMonth]);

  return (
    <Select
      value={selected}
      onValueChange={(value) => {
        setSelected(value);
      }}
    >
      <SelectTrigger
        className={cn("h-8 w-28 bg-primary text-primary-foreground text-sm")}
      >
        <SelectValue placeholder="Pilih Bulan" />
      </SelectTrigger>
      <SelectContent className="text-xs">
        <SelectItem value="0">Semua</SelectItem>
        {months.map((item, index) => (
          <SelectItem key={index} value={String(index + 1)}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
