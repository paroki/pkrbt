import { readPolicies } from "@directus/sdk";
import { UserPolicy } from "@pkrbt/directus";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import localforage from "localforage";
import { CacheConfig } from "~/common/config";
import { sdkCreateClient } from "~/services/directus.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const directus = await sdkCreateClient(request);
  const policies = await directus.request(
    readPolicies({
      fields: ["id", "name", "description"],
      filter: {
        _or: [
          {
            name: {
              _eq: "Pengurus Harian",
            },
          },
          {
            name: {
              _eq: "Bendahara",
            },
          },
        ],
      },
    }),
  );

  return json(policies);
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  let policies = await localforage.getItem<UserPolicy[]>(
    CacheConfig.keys.policies,
  );
  if (null === policies) {
    policies = await serverLoader();
    await localforage.setItem(CacheConfig.keys.policies, policies);
  }

  return policies;
}
