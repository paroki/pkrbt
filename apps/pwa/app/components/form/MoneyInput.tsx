import { ComponentProps, forwardRef, useReducer } from "react";
import { Input } from "../shadcn/input";

const formatter = Intl.NumberFormat("id-ID", {
  currency: "IDR",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const MoneyInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ defaultValue, ...props }, ref) => {
    const initial = defaultValue ? formatter.format(Number(defaultValue)) : "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [value, setValue] = useReducer((_: any, next: string) => {
      const digits = next.replace(/\D/g, "");
      return formatter.format(Number(digits));
    }, initial);

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={(e) => e.target.select()}
      />
    );
  },
);
MoneyInput.displayName = "MoneyInput";

export default MoneyInput;
