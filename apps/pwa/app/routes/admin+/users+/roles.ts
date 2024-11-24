import { readRoles } from "@directus/sdk";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import localforage from "localforage";
import { CacheConfig } from "~/common/config";
import { sdkCreateClient } from "~/services/directus.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const directus = await sdkCreateClient(request);
  const roles = await directus.request(
    readRoles({
      fields: ["id", "name", "description"],
      filter: {
        _and: [
          {
            name: {
              _neq: "Administrator",
            },
          },
          {
            name: {
              _neq: "Guest",
            },
          },
        ],
      },
      sort: ["name"],
    }),
  );

  return json(roles);
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  let roles = await localforage.getItem(CacheConfig.keys.roles);

  if (null === roles) {
    roles = await serverLoader();
    localforage.setItem(CacheConfig.keys.roles, roles);
  }

  return roles;
}
