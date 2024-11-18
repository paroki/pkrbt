import { ActionFunctionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import HarianCreateForm from "~/pkg/pendapatan/components/HarianCreateForm";
import { updatePendapatan } from "~/pkg/pendapatan/pendapatan.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await updatePendapatan(request);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    throw new Response("Gagal menyimpan data.", {
      status: 500,
      statusText: "Error",
    });
  }
}

export default function Page() {
  const data = useActionData<typeof action>();
  let pendapatan = undefined;
  if (data) {
    pendapatan = data.pendapatan;
  }
  return <HarianCreateForm pendapatan={pendapatan} />;
}
