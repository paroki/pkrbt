import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema, type UserFormValues } from "../../schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UserRoleCheckbox } from "./UserRoleCheckbox";
import { useFetcher } from "react-router";
import { z } from "shared/utils";
import { SaveButton } from "shared/ui/buttons/SaveButton";
import type { User } from "shared/types";

export default function UserForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      ...user,
      role: user.role?.split(","),
    },
  });

  const fetcher = useFetcher();
  async function onSubmit(data: UserFormValues) {
    if (form.formState.isValid === true) {
      await fetcher.submit(data, {
        method: "POST",
      });
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>Update data user</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-user-update" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nama</FieldLabel>
                  <Input id="name" autoComplete="name" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" autoComplete="email" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Hak Akses</FieldLabel>
                  <UserRoleCheckbox
                    value={field.value}
                    onChange={(roles) => {
                      form.setValue("role", roles);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"horizontal"}>
          <SaveButton
            form="form-user-update"
            loading={fetcher.state !== "idle"}
            disabled={!form.formState.isValid}
          />
        </Field>
      </CardFooter>
    </Card>
  );
}
