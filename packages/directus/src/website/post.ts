import { Directus } from "@pkrbt/directus-core";
import {
  createGraphql,
  Graphql,
  GraphqlPaginateParams,
  ImageType,
  Post,
  restMethods,
  Schema,
  SEO,
} from "..";
import {
  postReadFields,
  postSearchFields,
  postSearchFragment,
} from "./post.query";

type SearchWithCategory = GraphqlPaginateParams & {
  category?: string;
  keyword?: string;
  sort?: string[];
};

type PostR = Omit<Post, "slug"> &
  Pick<Required<Post>, "id" | "slug"> & {
    cover?: ImageType;
    seo: Required<SEO>;
  };

function createReadGraphql(directus: Directus<Schema>) {
  const gql = createGraphql(directus, {
    type: "post_by_id",
    fields: postReadFields,
    fragment: {
      name: "searchFragment",
      content: postSearchFragment,
    },
  });

  gql.addParam({ name: "id", type: "ID" });
  return gql;
}

export function post(directus: Directus<Schema>) {
  const methods = restMethods<PostR>(directus, "post");

  /**
   * Search posts with category or keyword
   */
  async function search(params: Partial<SearchWithCategory>) {
    const withDefaults: SearchWithCategory = {
      page: 1,
      limit: 10,
      sort: ["-publishedAt"],
      ...params,
    };

    const gql = new Graphql({
      directus,
      fields: postSearchFields,
      fragment: {
        name: "searchFragment",
        content: postSearchFragment,
      },
      type: "post",
    });

    gql.addParam({ name: "sort", type: "[String!]!" });
    if (withDefaults.keyword) {
      gql.addParam({ name: "keyword", argumentName: "search", type: "String" });
    }

    if (withDefaults.category) {
      withDefaults.filter = {
        category: {
          id: {
            _eq: withDefaults.category,
          },
        },
      };

      gql.addParam({ name: "filter", type: "post_filter" });
    }

    return await gql.paginate<PostR>(withDefaults);
  }

  async function read(id: string | number) {
    let item;
    let error;

    const gql = createReadGraphql(directus);
    try {
      const { data, error: readError } = await gql.execute<Post>({ id });
      item = data;
      error = readError;
    } catch (e) {
      error = new Error("unknown error", { cause: e });
      if (e instanceof Error) {
        error = e;
      }
    }

    return { item, error };
  }

  async function readBySlug(slug: string) {
    const { error: findError, id } = await methods.findId({
      filter: {
        slug: { _eq: slug },
      },
    });

    if (findError) {
      return { error: findError, item: undefined };
    }

    if (!id) {
      return { item: undefined, error: undefined };
    }

    return await read(id);
  }

  return {
    ...methods,
    readBySlug,
    search,
  };
}
