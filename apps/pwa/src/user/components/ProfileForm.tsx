"use client";

import { User } from "@pkrbt/directus";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@pkrbt/ui/shadcn/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@pkrbt/ui/shadcn/input";

type Props = {
  user: User;
};

const Schema = z.object({
  nama: z.string().min(5),
  email: z.string().email(),
});

export default function ProfileForm({ user }: Props) {
  const nama = user.nama ? user.nama : `${user.first_name} ${user.last_name}`;
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      nama,
      email: user.email,
    },
  });

  const onSubmit = () => {};

  return (
    <div className="w-2/3 items-center">
      <div>
        <h1>{nama}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>nama lengkap anda</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    alamat email yang anda gunakan
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
