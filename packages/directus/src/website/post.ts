import { createItem, deleteItem } from "@directus/sdk";
import { DirectusCore as Directus } from "../core";
import { PageParams, Post } from "../types";

const gqlLatest = `
query post($page: Int!, $limit: Int!) {
  post(
    sort: ["-published_at"],
    page: $page,
    limit: $limit
  ) {
    id
    status
    sort
    title
    summary
    published_at
    blocks {
      id
      item {
                ... on block_markdown {
                    id
                    body
                }
                ... on block_richtext {
                    id
                    body
                }
                ... on block_hero {
                    id
                    title
                    subtitle
                    content
                    images {
                        id
                        directus_files_id {
                            id
                            title
                            type
                            width
                            height
                            description
                        }
                    }
                }
            }
            collection
        }
        category {
            title
            slug
            color
        }
        seo {
            id
            title
            meta_description
            canonical_url
            no_follow
            no_index
            sitemap_change_frequency
            sitemap_priority
            og_image {
                id
                title
                width
                height
            }
        }
    }
}
`;
/* eslint no-unused-vars: 0 */
export type PostType = {
  getBySlug: (slug: string) => Promise<Post | undefined>;
  latest: (params?: PageParams) => Promise<Post[]>;
  create: (item: Post) => Promise<Post>;
  remove: (id: string) => Promise<void>;
};

export function post(directus: Directus): PostType {
  async function getBySlug(slug: string) {
    const query = `
      query Post($slug: String!) {
          post(sort: ["-published_at"], filter: {slug: $slug}) {
              id
              status
              sort
              title
              summary
              published_at
          }
      }
    `;
    const { post } = await directus.graphql.query(query, { slug });
    return post[0] as unknown as Required<Post>;
  }

  async function latest(params?: PageParams) {
    const withDefaults: PageParams = {
      ...{
        page: 1,
        limit: 5,
      },
      ...params,
    };
    const { page, limit } = withDefaults;
    const { post } = await directus.graphql.query(gqlLatest, { page, limit });
    return post as unknown as Post[];
  }

  async function create(item: Post) {
    return await directus.rest.request(createItem("post", item));
  }

  async function remove(id: string) {
    return await directus.rest.request(deleteItem("post", id));
  }

  return {
    latest,
    getBySlug,
    create,
    remove,
  };
}
