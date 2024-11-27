import { readFiles } from "@directus/sdk";
import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { sdkCreateClient } from "~/services/directus.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.id, "Unknown folder to load");

  const directus = await sdkCreateClient(request);
  const files = await directus.request(
    readFiles({
      fields: ["id", "title", "description", "width", "height"],
      filter: {
        folder: {
          id: {
            _eq: params.id,
          },
        },
      },
    }),
  );
  return json(files);
}
