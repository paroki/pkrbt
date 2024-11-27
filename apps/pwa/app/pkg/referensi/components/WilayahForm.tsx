import { zodResolver } from "@hookform/resolvers/zod";
import { WilayahR } from "@pkrbt/directus";
import { Form, useNavigate } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { cn } from "~/common/utils";
import BackButton from "~/components/buttons/BackButton";
import RemoveButton from "~/components/buttons/RemoveButton";
import SaveButton from "~/components/buttons/SaveButton";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Input } from "~/components/shadcn/input";

export const WilayahSchema = z.object({
  nama: z.string().min(1, "nama stasi harus diisi"),
  gereja: z.string(),
});

export const WilayahResolver = zodResolver(WilayahSchema);

export default function WilayahForm({ wilayah }: { wilayah?: WilayahR }) {
  const { handleSubmit, register, watch, formState } = useRemixForm<
    z.infer<typeof WilayahSchema>
  >({
    mode: "onSubmit",
    resolver: WilayahResolver,
    defaultValues: {
      nama: wilayah?.nama ?? undefined,
      gereja: wilayah?.gereja ?? undefined,
    },
  });

  const navigate = useNavigate();
  const nama = watch("nama");

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {(wilayah?.nama ?? nama) ? nama : "Data Stasi Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          method="POST"
          onSubmit={handleSubmit}
          className={cn("flex flex-col gap-4")}
        >
          <FormItem>
            <FormLabel>Nama Stasi</FormLabel>
            <Input {...register("nama")} />
            <FormMessage error={formState.errors.nama} />
            <FormDescription>nama Lengkap Stasi</FormDescription>
          </FormItem>
          <FormItem>
            <FormLabel>Nama Gereja</FormLabel>
            <Input {...register("gereja")} />
            <FormMessage error={formState.errors.gereja} />
            <FormDescription>nama gereja</FormDescription>
          </FormItem>
          <div className="flex flex-row gap-2">
            <BackButton to="/referensi/wilayah" />
            <SaveButton />
            {wilayah && (
              <RemoveButton
                onDelete={() => {
                  navigate(`/referensi/wilayah/${wilayah.id}/remove`);
                }}
              />
            )}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
