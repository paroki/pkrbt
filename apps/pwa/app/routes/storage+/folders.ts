import { readFolders } from "@directus/sdk";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { sdkCreateClient } from "~/services/directus.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const directus = await sdkCreateClient(request);
  const folders = await directus.request(
    readFolders({
      fields: ["id", "name", { parent: ["id", "name"] }],
      filter: {
        _or: [
          {
            parent: {
              name: {
                _eq: "kegiatan",
              },
            },
          },
        ],
      },
    }),
  );

  return json(folders);
}
