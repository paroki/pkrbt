import { readPolicies } from "@directus/sdk";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import localforage from "localforage";
import { sdkCreateClient } from "~/services/directus.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const directus = await sdkCreateClient(request);
  const items = await directus.request(
    readPolicies({
      fields: ["id", "name"],
    }),
  );

  return json({ policies: items });
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  let policies = await localforage.getItem("policies");

  if (!policies) {
    policies = await serverLoader();
    await localforage.setItem("policies", policies);
  }
  return json({ policies });
}
