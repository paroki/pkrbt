import { Form, Link } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/shadcn/input";
import { OrganisasiR, UserR } from "@pkrbt/directus";
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";
import { Button } from "~/components/shadcn/button";
import { HomeIcon, SaveIcon } from "lucide-react";
import { Checkbox } from "~/components/shadcn/checkbox";
import { FormEvent } from "react";
import { toast } from "~/hooks/shadcn/use-toast";

export const BiodataFormSchema = z.object({
  nama: z.string().min(3),
  tempatLahir: z.string().min(3),
  tanggalLahir: z.string().nullable(),
  organisasi: z.array(z.string()),
});

type Props = {
  profil: UserR;
  organisasiList: OrganisasiR[];
};

export default function BiodataForm({ profil, organisasiList }: Props) {
  const resolver = zodResolver(BiodataFormSchema);

  const userOrganisasi: string[] = [];

  if (profil.organisasi && profil.organisasi.length > 0) {
    profil.organisasi.map((item) => {
      userOrganisasi.push(item.organisasi.id);
    });
  }

  const { register, handleSubmit, formState, getValues, setValue } =
    useRemixForm<z.infer<typeof BiodataFormSchema>>({
      mode: "onSubmit",
      resolver,
      submitData: { intent: "update" },
      defaultValues: {
        nama: profil.nama ?? undefined,
        tempatLahir: profil.tempatLahir ?? undefined,
        tanggalLahir: profil.tanggalLahir ?? undefined,
        organisasi: userOrganisasi,
      },
    });

  async function doSubmit(e?: FormEvent<HTMLFormElement>) {
    await handleSubmit(e);
    toast({
      title: "Biodata",
      description: "Perubahan biodata telah disimpan!",
    });
  }

  return (
    <Form method="POST" onSubmit={doSubmit} className="flex flex-col gap-y-4">
      <FormItem>
        <FormLabel htmlFor="nama">Nama Lengkap</FormLabel>
        <Input id="nama" type="text" {...register("nama")} />
        <FormMessage error={formState.errors.nama} />
        <FormDescription>
          nama lengkap tanpa singkatan sesuai dengan kartu identitas (ktp/kartu
          pelajar)
        </FormDescription>
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="tempatLahir">Tempat Lahir</FormLabel>
        <Input id="tempatLahir" type="text" {...register("tempatLahir")} />
        <FormMessage error={formState.errors.tempatLahir} />
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="tanggalLahir">Tanggal Lahir</FormLabel>
        <Input
          id="tanggalLahir"
          type="date"
          {...register("tanggalLahir")}
          lang="id-ID"
        />
        <FormMessage error={formState.errors.tanggalLahir} />
      </FormItem>
      <FormItem>
        <FormLabel>Tandai organisasi yang diikuti di PKRBT:</FormLabel>
        {organisasiList.map((item) => (
          <FormItem
            key={item.id}
            className="flex items-center content-center gap-x-2"
          >
            <Checkbox
              id={item.id}
              defaultChecked={getValues("organisasi").includes(item.id)}
              onCheckedChange={(checked) => {
                let organisasi = getValues("organisasi");
                if (checked && !organisasi.includes(item.id)) {
                  organisasi.push(item.id);
                } else {
                  organisasi = organisasi.filter((value) => value !== item.id);
                }
                setValue("organisasi", organisasi);
              }}
            />
            <FormLabel htmlFor={item.id} className="text-sm font-normal">
              {item.nama}
            </FormLabel>
          </FormItem>
        ))}
      </FormItem>

      <div className="flex gap-x-4">
        <Button type="submit">
          <SaveIcon />
          Simpan
        </Button>
        <Button asChild>
          <Link to="/dashboard/layanan">
            <HomeIcon />
            Kembali
          </Link>
        </Button>
      </div>
    </Form>
  );
}
