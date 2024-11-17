import { zodResolver } from "@hookform/resolvers/zod";
import { MisaR } from "@pkrbt/directus";
import { Form, Link } from "@remix-run/react";
import { LucideSave, SkipBackIcon } from "lucide-react";
import { FormEvent } from "react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { cn } from "~/common/utils";
import { FormItem, FormMessage } from "~/components/form";
import { Button } from "~/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Input } from "~/components/shadcn/input";
import { Label } from "~/components/shadcn/label";

export const MisaSchema = z.object({
  tanggal: z.string(),
  perayaan: z.string().min(5, "perayaan harus di isi"),
});

type Props = {
  misa?: MisaR;
};

export default function MisaForm({ misa }: Props) {
  const resolver = zodResolver(MisaSchema);
  const { register, handleSubmit, formState } = useRemixForm<
    z.infer<typeof MisaSchema>
  >({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      tanggal: misa?.tanggal ?? undefined,
      perayaan: misa?.perayaan ?? undefined,
    },
  });

  async function doSubmit(e: FormEvent<HTMLFormElement>) {
    await handleSubmit(e);

    console.log(formState);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah data Misa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={(e) => doSubmit(e)}
          method="POST"
          className={cn("flex flex-col gap-y-4")}
        >
          <FormItem>
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input {...register("tanggal")} id="tanggal" type="date" />
            <FormMessage error={formState.errors.tanggal} />
          </FormItem>
          <FormItem>
            <Label htmlFor="perayaan">Perayaan</Label>
            <Input {...register("perayaan")} id="perayaan" name="perayaan" />
            <FormMessage error={formState.errors.perayaan} />
          </FormItem>
          <div className="flex gap-x-2">
            <Button type="submit">
              <LucideSave />
              Simpan
            </Button>
            <Button asChild>
              <Link to="/pendapatan/misa">
                <SkipBackIcon />
                Kembali
              </Link>
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
