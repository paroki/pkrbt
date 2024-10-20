import { DirectusCore, DirectusPlugin } from "./core";
import { category, page, post } from "./website";

const website: DirectusPlugin = () => {
  return {
    page,
    post,
    category,
  };
};

export const Directus = DirectusCore.plugin(website);

// eslint-disable-next-line no-redeclare
export type Directus = InstanceType<typeof Directus>;
