import { zodResolver } from "@hookform/resolvers/zod";
import { LingkunganR } from "@pkrbt/directus";
import { Form, useNavigate } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import BackButton from "~/components/buttons/BackButton";
import RemoveButton from "~/components/buttons/RemoveButton";
import SaveButton from "~/components/buttons/SaveButton";
import { FormItem, FormLabel } from "~/components/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Input } from "~/components/shadcn/input";
import { useWilayah } from "../hooks";
import { useEffect, useState } from "react";

export const LingkunganSchema = z.object({
  nama: z.string().min(1, "nama lingkungan harus diisi"),
  wilayah: z.string().nullable(),
});

export const LingkunganResolver = zodResolver(LingkunganSchema);
export default function LingkunganForm({
  lingkungan,
}: {
  lingkungan?: LingkunganR;
}) {
  const { pusatParoki } = useWilayah();
  const [wilayah, setWilayah] = useState("");

  const { handleSubmit, watch, register, setValue } = useRemixForm<
    z.infer<typeof LingkunganSchema>
  >({
    mode: "onSubmit",
    resolver: LingkunganResolver,
    defaultValues: {
      nama: lingkungan?.nama ?? undefined,
      wilayah: lingkungan?.wilayah?.id ?? wilayah,
    },
  });

  const nav = useNavigate();
  const nama = watch("nama");

  useEffect(() => {
    if (pusatParoki) {
      setWilayah(pusatParoki.id);
      setValue("wilayah", pusatParoki.id);
    }
  }, [pusatParoki, setValue]);

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Input {...register("wilayah")} type="hidden" />
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>
            {(lingkungan ?? nama) ? nama : "Data Lingkungan Baru"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FormItem>
            <FormLabel htmlFor="nama">Nama Lingkungan</FormLabel>
            <Input {...register("nama")} />
          </FormItem>
        </CardContent>
        <CardFooter className="gap-2">
          <BackButton to="/referensi/lingkungan" />
          <SaveButton />
          {lingkungan && (
            <RemoveButton
              onDelete={() => {
                nav(`/referensi/lingkungan/${lingkungan.id}/remove`);
              }}
            />
          )}
        </CardFooter>
      </Card>
    </Form>
  );
}
