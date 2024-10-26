import PostList from "./components/list";
import { Metadata } from "next";
import { generateMeta } from "@/utils/meta";
import { directus } from "@/utils/directus";

export async function generateMetadata(): Promise<Metadata> {
  return await generateMeta({
    title: "Kumpulan Berita dan Artikel | PKRBT",
    description: "Kumpulan artikel Paroki Kristus Raja Barong Tongkok",
    type: "article",
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const filters = await searchParams;
  const withDefaults = {
    page: Number(filters.page ?? 1),
    limit: 9,
    sort: ["-publishedAt"],
    keyword: filters.keyword,
  };

  const { items, meta } = await directus.post.search(withDefaults);

  const pageMeta = {
    size: meta?.pageSize ?? 0,
    page: meta?.page ?? 1,
    keyword: withDefaults.keyword,
  };

  return (
    <>
      <PostList posts={items} pageMeta={pageMeta} />
    </>
  );
}
