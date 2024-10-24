import { components } from "./openapi";
import { File } from "./system";
export type SEO = components["schemas"]["ItemsSEO"];

export type BlockHeroImages = components["schemas"]["ItemsHeroImages"] & {
  image?: File;
};
export type BlockHero = components["schemas"]["ItemsBlockHero"] & {
  images?: BlockHeroImages;
};
export type BlockMarkdown = components["schemas"]["ItemsBlockMarkdown"];
export type BlockRichtext = components["schemas"]["ItemsBlockRichtext"];

export type Category = components["schemas"]["ItemsCategory"] & {
  cover?: File;
  seo?: SEO;
};

// post section
export type PostBlockItem = BlockHero | BlockMarkdown | BlockRichtext;
export type PostImages = components["schemas"]["ItemsPostImages"] & {
  image?: File;
};
export type PostBlocks = Omit<
  components["schemas"]["ItemsPostBlocks"],
  "item"
> & {
  item?: PostBlockItem;
};
export type Post = components["schemas"]["ItemsPost"] & {
  blocks?: PostBlocks[];
  cover?: File;
  seo?: SEO;
  category?: Category;
  images?: PostImages;
};
