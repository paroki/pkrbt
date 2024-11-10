"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pendapatan, PendapatanR } from "@pkrbt/directus";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@pkrbt/ui/shadcn/form";
import { Input } from "@pkrbt/ui/shadcn/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PendapatanP, SumberPendapatanR } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@pkrbt/ui/shadcn/select";
import { Textarea } from "@pkrbt/ui/shadcn/textarea";
import MoneyInput from "@pkrbt/ui/components/money";
import { Button } from "@pkrbt/ui/shadcn/button";
import { SaveIcon } from "lucide-react";

type Props = {
  pendapatan?: Pendapatan;
  sumberPendapatan: SumberPendapatanR[];
  saveAction: (payload: PendapatanP) => Promise<PendapatanR>;
};

const schema = z.object({
  tanggal: z.string().date(),
  uraian: z.string(),
  jumlah: z.number(),
  sumber: z.string(),
  catatan: z.string().nullable(),
});

export default function PendapatanForm({
  pendapatan: initial,
  sumberPendapatan,
  saveAction,
}: Props) {
  const [pendapatan, setPendapatan] = useState<Pendapatan | undefined>(initial);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tanggal: pendapatan?.tanggal ?? "",
      uraian: pendapatan?.uraian ?? "",
      jumlah: pendapatan?.jumlah ?? undefined,
      sumber: pendapatan?.sumber?.id ?? undefined,
      catatan: pendapatan?.catatan ?? "",
    },
  });

  useEffect(() => {
    setPendapatan(initial);
  }, [initial]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const payload: PendapatanP = { ...values };
    if (pendapatan?.id) {
      payload.id = pendapatan.id;
    }
    const item = await saveAction(payload);
    setPendapatan(item);
  };

  return (
    <div className="sm:w-full lg:w-3/4 items-center content-center">
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="tanggal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="uraian"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uraian</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="sumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sumber</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih Sumber Pendapatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sumberPendapatan.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.sumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MoneyInput
                    form={form}
                    label="Jumlah"
                    {...field}
                    name="jumlah"
                    placeholder="Jumlah"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="catatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-24">
            <SaveIcon />
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
}
