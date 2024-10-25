import { Directus } from "@pkrbt/directus-core";
import { Category, createGraphql, Schema } from "..";
import { restMethods } from "..";
import { categoryFields, categoryFragment } from "./category.query";

export function category(directus: Directus<Schema>) {
  const methods = restMethods(directus, "category");

  return {
    ...methods,
    read: async (id: string) => {
      const gql = createGraphql(directus, {
        type: "category_by_id",
        fields: categoryFields,
        fragment: {
          name: "categoryFragment",
          content: categoryFragment,
        },
      });

      gql.addParam({ name: "id", type: "ID" });
      const { data: item, error } = await gql.execute<Category>({ id });

      return { item, error };
    },
  };
}
