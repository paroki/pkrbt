import { Directus } from "@pkrbt/directus-core";
import { createGraphql, restMethods, Schema } from "..";
import { Page } from "./types";
import { pageReadFields } from "./page.query";

/**
 * Page response with required values
 */
type PageR = Omit<Page, "id"> & Pick<Required<Page>, "id" | "seo">;

export function page(directus: Directus<Schema>) {
  const methods = restMethods<PageR>(directus, "page");

  async function read(id: string | number) {
    const gql = createGraphql(directus, {
      type: "page_by_id",
      fields: pageReadFields,
    });
    gql.addParam({ name: "id", type: "ID" });

    const { data, error: readError } = await gql.execute<PageR>({ id });
    const item = data;
    const error = readError;

    return { item, error };
  }

  async function readBySlug(slug: string) {
    let item;
    let error;

    const { error: findError, id } = await methods.findId({
      filter: {
        slug: { _eq: slug },
      },
    });

    if (findError) {
      return { error: findError, item };
    }

    if (!id) {
      return { item, error };
    }

    return await read(id);
  }

  return {
    read,
    ...methods,
    readBySlug,
  };
}
