import api from "@/utils/strapi";
import ArticleList from "./components/list";
import { Metadata } from "next";
import { generateMeta } from "@/utils/meta";

type SearchParams = {
  search?: string;
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

export default async function Page({ searchParams }: Props) {
  const withDefaults = {
    page: searchParams.page ?? 1,
    limit: 9,
    sort: ["publishedAt:desc"],
    filters: {
      $or: [
        {
          title: {
            $containsi: searchParams.search ?? "",
          },
        },
        {
          category: {
            name: {
              $containsi: searchParams.search ?? "",
            },
          },
        },
      ],
    },
  };

  const { items, meta } = await api.article.search(withDefaults);

  const pageMeta = {
    size: meta.pagination.pageCount ?? 0,
    page: withDefaults.page,
    search: searchParams.search,
  };

  return (
    <>
      <ArticleList articles={items} pageMeta={pageMeta} />
    </>
  );
}
