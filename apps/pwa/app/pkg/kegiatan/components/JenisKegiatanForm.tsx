import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher, useLocation } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { cn } from "~/common/utils";
import SaveButton from "~/components/buttons/SaveButton";
import { FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/shadcn/input";
import { useEffect } from "react";
import localforage from "localforage";
import { JenisKegiatanR } from "@pkrbt/directus";
import useJenisKegiatan from "../hooks";

export const JenisKegiatanSchema = z.object({
  jenisKegiatan: z.string().min(1, "jenis kegiatan harus diisi"),
});
export const JenisKegiatanResolver = zodResolver(JenisKegiatanSchema);

export default function JenisKegiatanForm({
  onSubmitted,
}: {
  onSubmitted?: (value: JenisKegiatanR) => void;
}) {
  const location = useLocation();
  const fetcher = useFetcher<JenisKegiatanR>();
  const { reload } = useJenisKegiatan();
  const { register, formState } = useRemixForm<
    z.infer<typeof JenisKegiatanSchema>
  >({
    mode: "onSubmit",
    resolver: JenisKegiatanResolver,
  });

  useEffect(() => {
    async function doReload() {
      await localforage.removeItem("jenis-kegiatan");
    }
    if (fetcher.data) {
      doReload();
      if (onSubmitted) {
        onSubmitted(fetcher.data);
      }
    }
  }, [fetcher.data, onSubmitted, reload]);

  return (
    <fetcher.Form
      method="POST"
      action={`/kegiatan/jenis-kegiatan/create?origin=${location.pathname}`}
      className={cn("flex flex-col gap-y-4")}
    >
      <FormItem>
        <FormLabel htmlFor="jenis">Jenis Kegiatan</FormLabel>
        <Input {...register("jenisKegiatan")} id="jenis" />
        <FormMessage error={formState.errors.jenisKegiatan} />
      </FormItem>
      <FormItem>
        <SaveButton />
      </FormItem>
    </fetcher.Form>
  );
}
