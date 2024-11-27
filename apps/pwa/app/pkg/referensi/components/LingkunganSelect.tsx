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
import { useLingkungan } from "../hooks";
import { Button } from "~/components/shadcn/button";
import { LucideLoaderCircle } from "lucide-react";

const LingkunganSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select>
  // eslint-disable-next-line react/prop-types
>(({ children, defaultValue, ...props }, ref) => {
  const { lingkungan, loaded, loading } = useLingkungan();
  return (
    <>
      {loading && !loaded ? (
        <Button variant={"outline"}>
          <LucideLoaderCircle className="animate-spin" />
          Loading
        </Button>
      ) : (
        <Select {...props} defaultValue={defaultValue}>
          <SelectTrigger ref={ref}>
            <SelectValue placeholder="Pilih Lingkungan" />
          </SelectTrigger>
          <SelectContent>
            {lingkungan.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
                defaultChecked={item.id === defaultValue}
              >
                {item.nama}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
});
LingkunganSelect.displayName = "LingkunganSelect";

export default LingkunganSelect;