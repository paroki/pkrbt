import { createItem, deleteItem } from "@directus/sdk";
import { DirectusCore as Directus } from "../core";
import { Page } from "../types";

export function page(directus: Directus) {
  async function getBySlug(slug: string): Promise<Required<Page>> {
    const { page } = await directus.graphql.query(`
      query {
        page(
          filter: {
            slug: {
            _eq: "${slug}"
            }
          }
        ){
          id
          title
          permalink
          slug
          seo {
            title
            meta_description
            og_image {
              id
              title
              width
              height
            }
          }
          blocks {
            id
            collection
            item {
              ... on block_hero {
                __typename
                id
                title
                subtitle
                content
                images {
                  directus_files_id {
                    id
                    title
                    description
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `);

    const ret = page ? page[0] : undefined;
    return ret as unknown as Required<Page>;
  }

  async function create(page: Page) {
    const rest = directus.rest;
    try {
      const response = await rest.request(createItem("page", page));
      return response;
    } catch (e) {
      console.log(JSON.stringify(e, undefined, 2));
    }
  }

  async function remove(id: string) {
    await directus.rest.request(deleteItem("page", id));
  }

  return {
    getBySlug,
    create,
    remove,
  };
}
