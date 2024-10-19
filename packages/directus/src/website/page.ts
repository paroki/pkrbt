import { graphql } from "@directus/sdk";
import directus from "../directus";
import { Page } from "../types";

const client = directus.with(graphql());

export async function fetchPage(slug: string): Promise<Required<Page>> {
  const { page } = await client.query(`
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
  return page[0] as unknown as Required<Page>;
}
