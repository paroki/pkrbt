import { MisaR, PendapatanR } from "@pkrbt/directus";
import { Form, useLocation } from "@remix-run/react";
import { z } from "zod";
import SumberSelect from "./SumberSelect";
import MoneyInput from "~/components/form/MoneyInput";
import { Textarea } from "~/components/shadcn/textarea";
import { Button } from "~/components/shadcn/button";
import { LucideDelete, LucideSave } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem, FormLabel, FormMessage } from "~/components/form";

export type Intent = "update" | "create";

export const PendapatanFormSchema = z.object({
  id: z.string().nullable(),
  sumber: z.string(),
  jumlah: z.string(),
  catatan: z.string().nullable(),
  misa: z.string(),
  intent: z.string(),
  tanggal: z.string(),
});

export default function PendapatanForm({
  pendapatan,
  intent,
  onFormSubmitted,
  misa,
}: {
  pendapatan?: PendapatanR;
  intent: Intent;
  misa: MisaR;
  onFormSubmitted: () => void;
}) {
  const resolver = zodResolver(PendapatanFormSchema);
  const location = useLocation();

  const { register, formState, handleSubmit, setValue } = useRemixForm<
    z.infer<typeof PendapatanFormSchema>
  >({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      id: pendapatan?.id,
      sumber: pendapatan?.sumber.id ?? undefined,
      catatan: pendapatan?.catatan ?? undefined,
      misa: misa.id,
      tanggal: misa.tanggal ?? undefined,
      intent,
    },
    submitConfig: {
      action: location.pathname,
      method: "POST",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function doSubmit(e: any) {
    await handleSubmit(e);
    if (formState.isSubmitSuccessful) {
      onFormSubmitted();
    }
  }

  async function doDelete() {
    setValue("intent", "delete");
    await handleSubmit();
    return true;
  }

  return (
    <Form
      method="POST"
      onSubmit={(e) => doSubmit(e)}
      action={`/pendapatan/misa/${misa.id}`}
    >
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("misa")} />
      <input type="hidden" {...register("intent")} />
      <input type="hidden" {...register("tanggal")} />
      <div className="flex flex-col gap-y-4">
        <FormItem>
          <FormLabel htmlFor="sumber">Sumber</FormLabel>
          <SumberSelect
            {...register("sumber")}
            name="sumber"
            onValueChange={(e) => {
              setValue("sumber", e);
            }}
          />
          <FormMessage error={formState.errors.sumber} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="jumlah">Jumlah</FormLabel>
          <MoneyInput
            {...register("jumlah")}
            name="jumlah"
            id="jumlah"
            defaultValue={pendapatan?.jumlah ?? ""}
          />
          <FormMessage error={formState.errors.jumlah} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="catatan">Catatan</FormLabel>
          <Textarea {...register("catatan")} id="catatan" name="catatan" />
          <FormMessage error={formState.errors.catatan} />
        </FormItem>
        <div className="flex flex-row gap-x-2">
          <Button type="submit">
            <LucideSave />
            Simpan
          </Button>
          {intent !== "create" && (
            <Button
              type="submit"
              onClick={() => doDelete()}
              variant={"destructive"}
            >
              <LucideDelete />
              Hapus
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
