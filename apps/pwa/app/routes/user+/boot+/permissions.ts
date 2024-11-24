import { readUserPermissions } from "@directus/sdk";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import localforage from "localforage";
import { sdkCreateClient } from "~/services/directus.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const directus = await sdkCreateClient(request);
  const permissions = await directus.request(readUserPermissions());

  return json({ permissions });
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const { permissions: items } = await serverLoader<typeof loader>();
  const permissions = items;
  await localforage.setItem("permissions", permissions);

  return json({ permissions });
}
