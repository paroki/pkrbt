import { zodResolver } from "@hookform/resolvers/zod";
import { MisaR } from "@pkrbt/directus";
import { json } from "@remix-pwa/sw";
import { ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
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

  if (errors) return json({ errors, defaultValues });

  try {
    const item = await createMisa(request, data);
    return json({ misa: item });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 500, statusText: "Error" });
    }
    throw new Error("Unknown error", { cause: e });
  }
}

export default function Page() {
  const data = useActionData<typeof action>();
  let created: MisaR | undefined;

  if (data) {
    created = data.misa;
  }
  return <MisaForm created={created} />;
}
