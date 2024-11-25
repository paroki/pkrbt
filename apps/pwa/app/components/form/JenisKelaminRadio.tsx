import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { RadioGroup, RadioGroupItem } from "../shadcn/radio-group";
import { Label } from "../shadcn/label";
import { cn } from "~/common/utils";
import _ from "lodash";

const JenisKelaminRadio = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ ...props }, ref) => {
  const options = [
    { label: "Laki-Laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];
  return (
    <RadioGroup {...props} ref={ref}>
      {options.map((item, index) => (
        <div
          key={`jenis-kelamin-${index}`}
          className={cn("flex items-center space-x-2")}
        >
          <RadioGroupItem id={_.kebabCase(item.label)} value={item.value} />
          <Label
            htmlFor={_.kebabCase(item.label)}
            className="flex flex-col cursor-pointer"
          >
            {item.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
});
JenisKelaminRadio.displayName = "JenisKelaminRadio";

export default JenisKelaminRadio;
