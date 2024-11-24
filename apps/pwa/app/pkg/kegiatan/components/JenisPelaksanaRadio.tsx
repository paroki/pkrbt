import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import _ from "lodash";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "~/common/utils";
import { Label } from "~/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "~/components/shadcn/radio-group";

const options = [
  {
    label: "Lingkungan / Stasi",
    value: "wilayah",
    description: "Kegiatan dilaksanakan oleh lingkungan dan stasi",
  },
  {
    label: "Organisasi",
    value: "organisasi",
    description: "Kegiatan dilaksanakan oleh organisasi paroki",
  },
];

const JenisPelaksanaRadio = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ ...props }, ref) => {
  return (
    <RadioGroup {...props} ref={ref}>
      {options.map((item, index) => (
        <div
          key={`organisasi-${index}`}
          className={cn("flex items-center space-x-2")}
        >
          <RadioGroupItem id={_.kebabCase(item.label)} value={item.value} />
          <Label
            htmlFor={_.kebabCase(item.label)}
            className="flex flex-col cursor-pointer"
          >
            {item.label}
            <span className="text-xs font-normal">{item.description}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
});
JenisPelaksanaRadio.displayName = "JenisPelaksanaRadio";

export default JenisPelaksanaRadio;
