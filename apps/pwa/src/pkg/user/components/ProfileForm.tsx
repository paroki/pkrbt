"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@pkrbt/ui/shadcn/form";
import { updateProfile } from "../actions";
import { UserR } from "../types";
import { Input } from "@pkrbt/ui/shadcn/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@pkrbt/ui/shadcn/button";

type Props = {
  user: UserR;
};

export const schema = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
});

export default function ProfileForm({ user }: Props) {
  const updateProfileId = updateProfile.bind(null, user.id);
  const nama = user.nama ? user.nama : `${user.first_name} ${user.last_name}`;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama,
      tempatLahir: user.tempatLahir ?? "",
    },
  });

  console.log(user.role);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    await updateProfileId(values);
  };

  return (
    <div className="sm:w-full lg:w-3/4 items-center content-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col bg-white p-4 rounded-md drop-shadow-md gap-y-4 w-2/3"
        >
          <FormField
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
