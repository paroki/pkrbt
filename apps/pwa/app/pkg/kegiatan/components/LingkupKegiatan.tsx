import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import _ from "lodash";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "~/common/utils";
import { Label } from "~/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "~/components/shadcn/radio-group";

const options = [
  {
    label: "Terbuka",
    value: "terbuka",
    description: "Kegiatan untuk semua umat di paroki/lingkungan/stasi",
  },
  {
    label: "Terbatas",
    value: "terbatas",
    description:
      "Kegiatan yang diperuntukan hanya bagi para pengurus organisasi/lingkungan/stasi",
  },
];

const LingkupKegiatan = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ ...props }, ref) => {
  return (
    <RadioGroup ref={ref} {...props}>
      {options.map((item, index) => (
        <div
          key={`lingkup-${index}`}
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
LingkupKegiatan.displayName = "LingkupKegiatan";

export default LingkupKegiatan;
