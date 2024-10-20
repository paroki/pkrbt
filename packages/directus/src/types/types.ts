import { components } from "./openapi";

export type Files = components["schemas"]["Files"];
export type BlockHeroFiles = components["schemas"]["ItemsBlockHeroFiles"] & {
  directus_files_id?: Files | null;
};
export type BlockHero = components["schemas"]["ItemsBlockHero"] & {
  images?: BlockHeroFiles[] | null;
};
export type BlockRichtext = components["schemas"]["ItemsBlockRichtext"];
export type BlockMarkdown = components["schemas"]["ItemsBlockMarkdown"];
export type Category = components["schemas"]["ItemsCategory"];

export type PageBlock = components["schemas"]["ItemsPageBlocks"] & {
  item?: BlockHero | BlockRichtext | BlockMarkdown | null;
};

export type SEO = components["schemas"]["ItemsSEO"];
export type Page = Omit<
  components["schemas"]["ItemsPage"],
  "blocks" | "seo"
> & {
  seo?: SEO;
  blocks?: PageBlock[] | null;
};

export type PostBlock = components["schemas"]["ItemsPostBlocks"];
export type Post = Omit<
  components["schemas"]["ItemsPost"],
  "blocks" | "category" | "seo"
> & {
  blocks?: PostBlock[] | null;
  seo?: SEO;
  category?: Category | null;
};

export type PageParams = {
  page: number;
  limit: number;
};

export type Schema = {
  page: Page[];
  post: Post[];
  category: Category[];
};
