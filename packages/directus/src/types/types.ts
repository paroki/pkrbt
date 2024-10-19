import { components } from "./openapi";

export type PageBlocks = components["schemas"]["ItemsPageBlocks"];
export type Page = components["schemas"]["ItemsPage"] & {
  seo: components["schemas"]["ItemsSEO"];
};

export type Schema = {
  page: components["schemas"]["ItemsPage"][];
};
