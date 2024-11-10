"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@pkrbt/ui/shadcn/form";
import { updateProfile, UserPayload } from "../actions";
import { UserR } from "../types";
import { Input } from "@pkrbt/ui/shadcn/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@pkrbt/ui/shadcn/button";
import { OrganisasiR } from "@pkrbt/directus";
import { Checkbox } from "@pkrbt/ui/shadcn/checkbox";
import { toast } from "@pkrbt/ui/hooks/use-toast";
import { HomeIcon, SaveIcon, User2Icon } from "lucide-react";
import AvatarUpload from "./AvatarUpload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@pkrbt/ui/shadcn/card";
import Link from "next/link";

type Props = {
  user: UserR;
  organisasi: OrganisasiR[];
};

export const schema = z.object({
  nama: z.string(),
  tempatLahir: z.string().nullable(),
  tanggalLahir: z.string().nullable(),
  organisasi: z.string().array(),
  avatar: z
    .object({
      id: z.string(),
    })
    .nullable(),
});

export default function ProfileForm({ user, organisasi }: Props) {
  const updateProfileId = updateProfile.bind(null, user.id);
  const org: string[] = [];

  if (user.organisasi.length) {
    for (let i = 0; i < user.organisasi.length; i++) {
      const o = user.organisasi[i].organisasi?.id as string;
      org.push(o as string);
    }
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: user.nama ?? `${user.first_name} ${user.last_name}`,
      tempatLahir: user.tempatLahir ?? null,
      tanggalLahir: user.tanggalLahir ?? undefined,
      organisasi: org,
      avatar: user.avatar ?? null,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const orgs: object[] = [];
    values.organisasi.map((item) => {
      orgs.push({ organisasi: item });
    });

    const payload = {
      ...values,
      organisasi: orgs,
    };

    await updateProfileId(payload as unknown as UserPayload);
    toast({
      title: "Profil Tersimpan",
      description: <p>Perubahan profil telah tersimpan</p>,
    });
  };

  return (
    <div className="sm:w-full items-center content-center">
      <Card className="drop-shadow-md">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-x-4">
            <User2Icon />
            <span>Profil</span>
            <Button asChild size={"icon"}>
              <Link href="/">
                <HomeIcon />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap gap-y-4 gap-x-8"
              method="post"
            >
              <div className="flex flex-col content-center items-center gap-y-2">
                <AvatarUpload user={user} />
                <p className="text-sm">Klik gambar untuk mengganti foto.</p>
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        nama lengkap tanpa singkatan
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tempatLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        tempat lahir sesuai dengan kartu identitas
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tanggalLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="organisasi"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Organisasi</FormLabel>
                        <FormDescription>
                          Beri tanda organisasi yang anda ikuti di PKRBT
                        </FormDescription>
                      </div>
                      {organisasi.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="organisasi"
                          render={({ field }) => {
                            const orgId = item.id as string;
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value.includes(orgId)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            orgId,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== orgId,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.nama}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-2">
                  <Button type="submit">
                    <SaveIcon />
                    Simpan
                  </Button>
                  <Button asChild>
                    <Link href="/">
                      <HomeIcon />
                      Kembali
                    </Link>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
