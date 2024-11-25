import { zodResolver } from "@hookform/resolvers/zod";
import { KegiatanR } from "@pkrbt/directus";
import { Form, useNavigate } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { cn } from "~/common/utils";
import { FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/shadcn/input";
import JenisKegiatanSelect from "./JenisKegiatanSelect";
import LingkupKegiatan from "./LingkupKegiatan";
import SaveButton from "~/components/buttons/SaveButton";
import { useEffect, useState } from "react";
import WilayahSelect from "~/pkg/referensi/components/WilayahSelect";
import { useWilayah } from "~/pkg/referensi/hooks";
import LingkunganSelect from "~/pkg/referensi/components/LingkunganSelect";
import JenisPelaksanaRadio from "./JenisPelaksanaRadio";
import OrganisasiSelect from "~/pkg/organisasi/components/OrganisasiSelect";
import { toastCreated, toastUpdated } from "~/common/toaster";
import BackButton from "~/components/buttons/BackButton";
import RemoveButton from "~/components/buttons/RemoveButton";
import CoverUpload from "./CoverUpload";
import MarkdownInput from "~/components/form/MarkdownInput";

export const KegiatanSchema = z.object({
  jenisPelaksana: z.string({ message: "pelaksana kegiatan harus dipilih" }),
  lingkup: z.string({ message: "lingkup kegiatan harus dipilih" }),
  jenisKegiatan: z.string().min(1, "jenis kegiatan harus dipilih"),
  namaKegiatan: z.string().min(1, "nama kegiatan harus diisi"),
  tempat: z.string().min(1, "tempat kegiatan harus diisi"),
  tanggal: z.string().min(10, "tanggal harus diisi"),
  dimulaiPada: z.string().min(5, "dimulai pada  harus diisi"),
  berakhirPada: z.string().nullable(),
  wilayah: z.string().nullable(),
  lingkungan: z.string().nullable(),
  organisasi: z.string().nullable(),
  organisasiStruktur: z.string().nullable(),
  keterangan: z.string().nullable(),
});

export const KegiatanResolver = zodResolver(KegiatanSchema);

export default function KegiatanForm({ kegiatan }: { kegiatan?: KegiatanR }) {
  const { register, formState, handleSubmit, watch, setValue } = useRemixForm<
    z.infer<typeof KegiatanSchema>
  >({
    mode: "onSubmit",
    resolver: KegiatanResolver,
    defaultValues: {
      jenisPelaksana: kegiatan?.jenisPelaksana ?? undefined,
      lingkup: kegiatan?.lingkup ?? "terbuka",
      jenisKegiatan: kegiatan?.jenisKegiatan.id ?? undefined,
      namaKegiatan: kegiatan?.namaKegiatan ?? undefined,
      tempat: kegiatan?.tempat ?? undefined,
      tanggal: kegiatan?.tanggal ?? undefined,
      dimulaiPada: kegiatan?.dimulaiPada ?? undefined,
      berakhirPada: kegiatan?.berakhirPada ?? undefined,
      lingkungan: kegiatan?.lingkungan?.id ?? null,
      wilayah: kegiatan?.wilayah?.id ?? null,
      organisasi: kegiatan?.organisasi?.id ?? null,
      organisasiStruktur: kegiatan?.organisasiStruktur?.id ?? null,
      keterangan: kegiatan?.keterangan ?? null,
    },
  });
  const navigate = useNavigate();
  const intent = kegiatan ? "update" : "create";

  const { getNamaWilayah } = useWilayah();
  const [namaWilayah, setNamaWilayah] = useState("");

  const jenisPelaksana = watch("jenisPelaksana");

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (intent === "update") {
        toastUpdated("perubahan kegiatan berhasil disimpan");
      } else {
        toastCreated("kegiatan berhasil dibuat");
      }
    }
  }, [formState.isSubmitSuccessful, intent]);

  function doDelete() {
    navigate(`/kegiatan/${kegiatan?.id}/delete`);
  }

  return (
    <div className={cn("flex rounded-md bg-white p-2 h-full")}>
      <Form
        method="POST"
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-y-4 max-w-sm md:max-w-fit")}
      >
        {kegiatan && <CoverUpload kegiatan={kegiatan} />}

        <FormItem>
          <FormLabel>Pelaksana Kegiatan</FormLabel>
          <JenisPelaksanaRadio
            {...register("jenisPelaksana")}
            onValueChange={(value) => {
              setValue("jenisPelaksana", value);
            }}
          />
          <FormMessage error={formState.errors.jenisPelaksana} />
        </FormItem>
        {jenisPelaksana === "wilayah" && (
          <FormItem>
            <FormLabel>Pilih Wilayah/Stasi</FormLabel>
            <WilayahSelect
              {...register("wilayah")}
              onValueChange={(value) => {
                const nama = getNamaWilayah(value);
                if (nama) {
                  setNamaWilayah(nama);
                }
                setValue("wilayah", value);
                setValue("lingkungan", null);
                setValue("organisasi", null);
                setValue("organisasiStruktur", null);
              }}
            />
            <FormMessage error={formState.errors.wilayah} />
          </FormItem>
        )}

        {jenisPelaksana === "wilayah" && namaWilayah === "Pusat Paroki" && (
          <FormItem>
            <FormLabel>Pilih Lingkungan</FormLabel>
            <LingkunganSelect
              {...register("lingkungan")}
              onValueChange={(value) => {
                setValue("lingkungan", value);
              }}
            />
            <FormMessage error={formState.errors.lingkungan} />
          </FormItem>
        )}

        {jenisPelaksana === "organisasi" && (
          <FormItem>
            <FormLabel>Organisasi Pelaksana</FormLabel>
            <OrganisasiSelect
              {...register("organisasi")}
              onValueChange={(value) => {
                setValue("organisasi", value);
                setValue("wilayah", null);
                setValue("lingkungan", null);
              }}
            />
            <FormMessage error={formState.errors.organisasi} />
          </FormItem>
        )}

        <FormItem>
          <FormLabel>Lingkup Kegiatan</FormLabel>
          <LingkupKegiatan
            {...register("lingkup")}
            onValueChange={(value) => {
              setValue("lingkup", value);
            }}
          />
          <FormMessage error={formState.errors.lingkup} />
        </FormItem>
        <FormItem>
          <FormLabel>Jenis Kegiatan</FormLabel>
          <div className="flex flex-row items-start gap-x-2">
            <JenisKegiatanSelect
              {...register("jenisKegiatan")}
              onValueChange={(value) => {
                setValue("jenisKegiatan", value);
              }}
            />
          </div>
          <FormMessage error={formState.errors.jenisKegiatan} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="namaKegiatan">Nama Kegiatan</FormLabel>
          <Input {...register("namaKegiatan")} id="namaKegiatan" />
          <FormMessage error={formState.errors.namaKegiatan} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="tempat">Tempat Pelaksanaan Kegiatan</FormLabel>
          <Input {...register("tempat")} id="tempat" />
          <FormMessage error={formState.errors.tempat} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="tanggal">Tanggal Pelaksanaan Kegiatan</FormLabel>
          <Input {...register("tanggal")} id="tanggal" type="date" />
          <FormMessage error={formState.errors.tanggal} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="dimulaiPada">Waktu dimulainya kegiatan</FormLabel>
          <Input {...register("dimulaiPada")} id="dimulaiPada" type="time" />
          <FormMessage error={formState.errors.dimulaiPada} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="berakhirPada">
            Perkiraan waktu berakhirnya kegiatan
          </FormLabel>
          <Input {...register("berakhirPada")} id="berakhirPada" type="time" />
          <FormMessage error={formState.errors.berakhirPada} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="keterangan">Keterangan</FormLabel>
          <MarkdownInput
            markdown={kegiatan?.keterangan ?? ""}
            onChange={(value) => {
              setValue("keterangan", value);
            }}
          />
        </FormItem>
        <div className="flex flex-row gap-x-2">
          <BackButton to="/kegiatan" label="Kembali" />
          <SaveButton />
          {kegiatan && <RemoveButton onDelete={() => doDelete()} />}
        </div>
      </Form>
    </div>
  );
}
