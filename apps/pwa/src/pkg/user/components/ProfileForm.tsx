"use client";

import {
  Form,
  FormControl,
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
import { useState } from "react";

type Props = {
  user: UserR;
};

export const schema = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
});

export default function ProfileForm({ user: initialUser }: Props) {
  const [user, setUser] = useState<UserR>(initialUser);
  const updateProfileId = updateProfile.bind(null, user.id);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: user.nama as string | undefined,
      tempatLahir: user.tempatLahir as string | undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const item = await updateProfileId(values as UserPayload);
    setUser(item);
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
