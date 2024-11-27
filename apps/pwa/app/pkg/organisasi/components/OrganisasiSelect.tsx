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
import { useOrganisasi } from "../hooks";
import { useRootOutletContext } from "~/hooks/outlets";

const OrganisasiSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select>
  // eslint-disable-next-line react/prop-types
>(({ children, defaultValue, ...props }, ref) => {
  //const { items, loading } = useOrganisasi()
  const { user } = useRootOutletContext();
  return (
    <Select {...props} defaultValue={defaultValue}>
      <SelectTrigger ref={ref}>
        <SelectValue placeholder="Pilih Organisasi" />
      </SelectTrigger>
      <SelectContent>
        {user.organisasi?.map((item) => (
          <SelectItem
            key={`organisasi-${item.organisasi.id}`}
            value={item.organisasi.id}
            defaultChecked={item.id === defaultValue}
          >
            {item.organisasi.nama}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
OrganisasiSelect.displayName = "OrganisasiSelect";

export default OrganisasiSelect;
