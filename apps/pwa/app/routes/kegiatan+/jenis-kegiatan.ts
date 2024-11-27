import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import createDirectus from "~/services/directus.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const directus = await createDirectus(request);
  const { items, error } = await directus.jenisKegiatan.search({
    sort: ["jenisKegiatan"],
  });

  if (error) {
    throw error;
  }

  return json(items ?? []);
}

/*
export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  let cached = await localforage.getItem<JenisKegiatan[]>("jenis-kegiatan");

  if (null === cached) {
    cached = await serverLoader<JenisKegiatan[]>();
    await localforage.setItem("jenis-kegiatan", cached);
  }

  return json(cached);
}
*/
