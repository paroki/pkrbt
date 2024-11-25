import { readRoles } from "@directus/sdk";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
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
              _neq: "Developer",
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
