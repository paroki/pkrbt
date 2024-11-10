import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../shadcn/form";
import { Input } from "../shadcn/input";
import { useEffect, useState } from "react";

type DateInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
};

export default function DateInput(props: DateInputProps) {
  const initialValue = props.form.getValues()[props.name] as string;
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [value, setValue] = useState<string>(initialValue);

  const exp = initialValue ? initialValue.split("-") : "";

  if (exp.length === 3) {
    setYear(exp[0] as string);
    setMonth(exp[1] as string);
    setDay(exp[2] as string);
  }

  console.log(initialValue);
  useEffect(() => {}, [day, month, year]);
  return (
    <div>
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => {
          field.value = initialValue;
          const _change = field.onChange;
          return (
            <div className="flex flex-col">
              <FormLabel className="pb-4">{props.label}</FormLabel>
              <div className="flex items-center content-center">
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="tt"
                      type="text"
                      onChange={(ev) => {
                        setDay(ev.target.value);
                      }}
                      value={day}
                      maxLength={2}
                      className="w-12"
                    />
                  </FormControl>
                </FormItem>
                <span>-</span>
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="bb"
                      type="text"
                      value={month}
                      maxLength={2}
                      className="w-12"
                    />
                  </FormControl>
                </FormItem>
                <span>-</span>
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="tttt"
                      type="text"
                      value={year}
                      maxLength={4}
                      className="w-16"
                    />
                  </FormControl>
                </FormItem>
              </div>
            </div>
          );
        }}
      ></FormField>
    </div>
  );
}
