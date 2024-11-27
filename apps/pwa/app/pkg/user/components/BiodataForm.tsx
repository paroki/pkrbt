import { Form } from "@remix-run/react";
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
import { Checkbox } from "~/components/shadcn/checkbox";
import { useEffect, useState } from "react";
import { toastUpdated } from "~/common/toaster";
import SaveButton from "~/components/buttons/SaveButton";
import BackButton from "~/components/buttons/BackButton";
import LingkunganSelect from "~/pkg/referensi/components/LingkunganSelect";
import WilayahSelect from "~/pkg/referensi/components/WilayahSelect";
import { useWilayah } from "~/pkg/referensi/hooks";
import JenisKelaminRadio from "~/components/form/JenisKelaminRadio";

export const BiodataFormSchema = z.object({
  nama: z.string().min(3, "nama harus diisi"),
  handphone: z.string().min(8, "nomor handphone harus diisi"),
  jenisKelamin: z.string().min(1, "jenis kelamin harus dipilih"),
  tempatLahir: z.string().min(3, "tempat lahir harus diisi"),
  tanggalLahir: z.string().nullable(),
  wilayah: z.string().nullable(),
  lingkungan: z.string().nullable().default(null),
  organisasi: z.array(z.string()),
});

type Props = {
  profil: UserR;
  organisasiList: OrganisasiR[];
};

export default function BiodataForm({ profil, organisasiList }: Props) {
  const resolver = zodResolver(BiodataFormSchema);
  const userOrganisasi: string[] = [];
  const { pusatParoki } = useWilayah();
  const [lingkungan] = useState(profil.lingkungan?.id);

  if (profil.organisasi && profil.organisasi.length > 0) {
    profil.organisasi.map((item) => {
      userOrganisasi.push(item.organisasi.id);
    });
  }

  const { register, handleSubmit, formState, getValues, setValue, watch } =
    useRemixForm<z.infer<typeof BiodataFormSchema>>({
      mode: "onSubmit",
      resolver,
      submitData: { intent: "update" },
      defaultValues: {
        nama: profil.nama ?? undefined,
        jenisKelamin: profil.jenisKelamin ?? "",
        handphone: profil.handphone ?? undefined,
        tempatLahir: profil.tempatLahir ?? undefined,
        tanggalLahir: profil.tanggalLahir ?? undefined,
        wilayah: profil.wilayah?.id ?? undefined,
        lingkungan,
        organisasi: userOrganisasi,
      },
    });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      toastUpdated("perubahan biodata berhasil disimpan");
    }
  }, [formState.isSubmitSuccessful]);

  const wilayah = watch("wilayah");
  return (
    <Form
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 w-full h-full"
    >
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
        <FormLabel htmlFor="nama">Jenis Kelamin</FormLabel>
        <JenisKelaminRadio
          {...register("jenisKelamin")}
          onValueChange={(v) => setValue("jenisKelamin", v)}
        />
        <FormMessage error={formState.errors.jenisKelamin} />
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="handphone">Nomor Handphone</FormLabel>
        <Input id="handphone" type="text" {...register("handphone")} />
        <FormMessage error={formState.errors.handphone} />
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
        <FormLabel>Stasi tempat tinggal anda</FormLabel>
        <WilayahSelect
          {...register("wilayah")}
          onValueChange={(value) => {
            setValue("wilayah", value);
            setValue("lingkungan", null);
          }}
        />
        <FormDescription>
          Pilih pusat paroki jika anda adalah umat lingkungan PKRBT
        </FormDescription>
      </FormItem>
      {pusatParoki && wilayah === pusatParoki.id && (
        <FormItem>
          <FormLabel>Pilih Lingkungan</FormLabel>
          <LingkunganSelect
            {...register("lingkungan")}
            defaultValue={lingkungan}
            onValueChange={(value) => {
              setValue("lingkungan", value);
              setValue("wilayah", pusatParoki.id);
            }}
          />
        </FormItem>
      )}

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

      <div className="flex gap-x-2">
        <BackButton to="/" />
        <SaveButton />
      </div>
    </Form>
  );
}
