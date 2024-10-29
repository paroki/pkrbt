import { components } from "../schema/openapi";
import { File, ImageType } from "../schema/system";
export type SEO = components["schemas"]["ItemsSEO"];

export type BlockHeroImages = components["schemas"]["ItemsHeroImages"] & {
  image?: ImageType;
};
export type BlockHero = components["schemas"]["ItemsBlockHero"] & {
  images?: BlockHeroImages;
};
export type BlockMarkdown = components["schemas"]["ItemsBlockMarkdown"];
export type BlockRichtext = components["schemas"]["ItemsBlockRichtext"];

export type BlockItem = BlockHero | BlockMarkdown | BlockRichtext;

// page sections
export type PageBlock = Omit<
  components["schemas"]["ItemsPageBlocks"],
  "item"
> & {
  item?: BlockItem;
};

export type Page = Omit<
  components["schemas"]["ItemsPage"],
  "cover" | "seo" | "blocks"
> & {
  cover?: File;
  seo?: SEO;
  blocks?: PageBlock[];
};

export type Category = components["schemas"]["ItemsCategory"] & {
  cover?: File;
  seo?: SEO;
};

// post section
export type PostImage = components["schemas"]["ItemsPostImages"] & {
  image: ImageType;
};
export type PostBlock = Omit<
  components["schemas"]["ItemsPostBlocks"],
  "item"
> & {
  item: BlockItem;
};
export type Post = components["schemas"]["ItemsPost"] & {
  blocks: PostBlock[];
  cover?: ImageType;
  seo?: SEO;
  category?: Category;
  images?: PostImage[];
};
