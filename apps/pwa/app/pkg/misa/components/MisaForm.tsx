import { zodResolver } from "@hookform/resolvers/zod";
import { MisaR } from "@pkrbt/directus";
import { Form, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { toastCreated } from "~/common/toaster";
import { cn } from "~/common/utils";
import BackButton from "~/components/buttons/BackButton";
import SaveButton from "~/components/buttons/SaveButton";
import { FormItem, FormMessage } from "~/components/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Input } from "~/components/shadcn/input";
import { Label } from "~/components/shadcn/label";

export const MisaSchema = z.object({
  tanggal: z.string().min(1, "tanggal harus diisi"),
  perayaan: z.string().min(5, "perayaan harus di isi"),
});

type Props = {
  misa?: MisaR;
  created?: MisaR;
};

export default function MisaForm({ misa, created }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (formState.isSubmitting) {
      setSubmitted(true);
    }
  }, [formState.isSubmitting]);

  useEffect(() => {
    if (created && submitted) {
      toastCreated();
      setSubmitted(false);
      navigate(`/pendapatan/misa/${created.id}`);
    }
  }, [created, navigate, submitted]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah data Misa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={handleSubmit}
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
            <SaveButton />
            <BackButton to="/pendapatan/misa" />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
