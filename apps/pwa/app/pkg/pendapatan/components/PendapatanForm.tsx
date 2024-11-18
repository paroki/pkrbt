import { MisaR, Pendapatan } from "@pkrbt/directus";
import {
  Form,
  useFetcher,
  useLocation,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { z } from "zod";
import SumberSelect from "./SumberSelect";
import MoneyInput from "~/components/form/MoneyInput";
import { Textarea } from "~/components/shadcn/textarea";
import { useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem, FormLabel, FormMessage } from "~/components/form";
import { useEffect, useState } from "react";
import { Input } from "~/components/shadcn/input";
import ConfirmDialog from "~/components/confirm";
import { toastCreated, toastRemoved, toastUpdated } from "~/common/toaster";
import { cn } from "~/common/utils";
import SaveButton from "~/components/buttons/SaveButton";
import NavButton from "~/components/buttons/NavButton";

export type Intent = "update" | "create" | "delete";

export const PendapatanFormSchema = z.object({
  id: z.string().nullable(),
  uraian: z.string().min(1, "uraian harus diisi"),
  sumber: z.string().min(1, "sumber pendapatan harus dipilih"),
  jumlah: z
    .string()
    .min(1, "jumlah harus diisi")
    .refine((value) => {
      const val = Number(value.replace(".", ""));
      return val > 0;
    }, "Jumlah harus lebih dari 0"),
  catatan: z.string().nullable(),
  misa: z.string().nullable(),
  intent: z.string(),
  tanggal: z.string().min(1, "tanggal harus diisi"),
});

export default function PendapatanForm({
  pendapatan,
  intent,
  misa,
}: {
  pendapatan?: Pendapatan;
  intent: Intent;
  misa?: MisaR;
  onFormSubmitted?: () => void;
  onBackClick?: () => void;
}) {
  const resolver = zodResolver(PendapatanFormSchema);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const nav = useNavigation();

  const { register, formState, handleSubmit, setValue } = useRemixForm<
    z.infer<typeof PendapatanFormSchema>
  >({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      id: pendapatan?.id,
      sumber: pendapatan?.sumber?.id ?? undefined,
      catatan: pendapatan?.catatan ?? undefined,
      misa: misa?.id ?? undefined,
      tanggal: pendapatan?.tanggal
        ? pendapatan.tanggal
        : misa?.tanggal
          ? misa.tanggal
          : undefined,
      uraian: pendapatan?.uraian
        ? pendapatan.uraian
        : misa?.perayaan
          ? misa.perayaan
          : undefined,
      intent,
    },
    submitConfig: {
      action: location.pathname,
      method: "POST",
    },
  });

  const refLink = pendapatan?.misa
    ? `/pendapatan/misa/${pendapatan.misa.id}`
    : "/pendapatan/harian";

  const fetcher = useFetcher();

  useEffect(() => {
    if (nav.state === "submitting") {
      setSubmitted(true);
      setLoading(true);
      return;
    }

    if (nav.state === "idle") {
      setLoading(false);
    }
  }, [nav.state, loading]);

  useEffect(() => {
    if (submitted && !loading) {
      if (intent === "create") {
        toastCreated();
        navigate(refLink);
      } else {
        toastUpdated();
        navigate(refLink);
      }
      setSubmitted(false);
    }
  }, [
    intent,
    loading,
    misa,
    navigate,
    refLink,
    submitted,
    setDeleted,
    deleted,
  ]);

  useEffect(() => {
    if (fetcher.state === "loading") {
      setDeleted(true);
    }
  }, [fetcher.state]);

  useEffect(() => {
    if (deleted && fetcher.data) {
      toastRemoved();
      setDeleted(false);
      navigate(refLink);
    }
  }, [deleted, fetcher.data, navigate, refLink]);

  function doDelete() {
    const removeRoute = `/pendapatan/remove/${pendapatan?.id}?ref=${refLink}`;
    fetcher.load(removeRoute);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("misa")} />
      <input type="hidden" {...register("intent")} />
      <div
        className={cn("flex top-0 right-0 bg-green-50 border-green-600")}
      ></div>
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
          <FormLabel htmlFor="tanggal">Tanggal</FormLabel>
          <Input
            type="date"
            {...register("tanggal")}
            disabled={!!pendapatan?.misa}
            id="tanggal"
          />
          <FormMessage error={formState.errors.tanggal} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="uraian">Uraian</FormLabel>
          <Input
            type="text"
            disabled={!!pendapatan?.misa}
            {...register("uraian")}
            id="uraian"
          />
          <FormMessage error={formState.errors.uraian} />
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
          <SaveButton />
          <NavButton to={refLink} label="Kembali" />
          {intent !== "create" && (
            <ConfirmDialog
              title="Aksi ini tidak dapat di batalkan!"
              onDelete={doDelete}
              loading={deleted}
            >
              <div>
                <p>
                  Apakah anda yakin ingin menghapus data pendapatan berikut:
                  <br />
                  <span className="text-red-500 font-bold">
                    sumber:{" "}
                    {pendapatan?.sumber ? pendapatan.sumber.sumber : "N/A"}
                  </span>
                  <br />
                  <span className="text-red-500 font-bold">
                    uraian: {pendapatan?.uraian}
                  </span>
                  <br />
                  <span>
                    Data yang sudah dihapus tidak dapat di kembalikan.
                  </span>
                </p>
              </div>
            </ConfirmDialog>
          )}
        </div>
      </div>
    </Form>
  );
}
