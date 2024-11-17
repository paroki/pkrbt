import { json, LoaderFunctionArgs } from "@remix-run/node";
import { sumberPendapatanList } from "~/pkg/pendapatan/pendapatan.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const sumberList = await sumberPendapatanList(request);
  return json({
    sumberList,
  });
}
