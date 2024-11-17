/* eslint-disable @typescript-eslint/no-unused-vars */
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn/select";
import { useSumberPendapatanList } from "../utils";

const SumberSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select>
  // eslint-disable-next-line react/prop-types
>(({ children, defaultValue, ...props }, ref) => {
  const data = useSumberPendapatanList();

  return (
    <Select {...props} defaultValue={defaultValue}>
      <SelectTrigger ref={ref}>
        <SelectValue placeholder="Pilih Sumber" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            defaultChecked={item.id === defaultValue}
          >
            {item.sumber}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
SumberSelect.displayName = "SumberSelect";

export default SumberSelect;
