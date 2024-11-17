import { zodResolver } from "@hookform/resolvers/zod";
import { json } from "@remix-pwa/sw";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { z } from "zod";
import MisaForm, { MisaSchema } from "~/pkg/misa/components/MisaForm";
import { createMisa } from "~/pkg/misa/misa.server";

export async function action({ request }: ActionFunctionArgs) {
  const resolver = zodResolver(MisaSchema);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof MisaSchema>>(request, resolver);

  console.log(errors);
  if (errors) return json({ errors, defaultValues });

  const item = await createMisa(request, data);

  return redirect(`/pendapatan/misa/${item.id}`);
}

export default function Page() {
  return <MisaForm />;
}
