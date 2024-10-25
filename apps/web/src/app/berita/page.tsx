import PostList from "./components/list";
import { Metadata } from "next";
import { generateMeta } from "@/utils/meta";
import { directus } from "@/utils/directus";

type SearchParams = {
  keyword?: string;
  page?: number;
  limit?: number;
  category?: string;
  sort?: string[];
  filters?: {
    [key: string]: number | string;
  };
};

type Props = {
  searchParams: SearchParams;
};

// TODO: find a way to remove the line below
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    title: "Kumpulan Berita dan Artikel | PKRBT",
    description: "Kumpulan artikel Paroki Kristus Raja Barong Tongkok",
    type: "article",
  });
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const withDefaults = {
    page: Number(searchParams.page) ?? 1,
    limit: 9,
    sort: ["-publishedAt"],
    filter: {},
  };

  const { items, meta } = await directus.post.search(withDefaults);

  console.log(meta);
  const pageMeta = {
    size: meta?.pageSize ?? 0,
    page: meta?.page ?? 1,
    keyword: searchParams.keyword,
  };

  return (
    <>
      <PostList posts={items} pageMeta={pageMeta} />
    </>
  );
}
