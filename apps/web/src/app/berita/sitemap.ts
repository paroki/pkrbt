import api from "@/utils/strapi";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

async function fetchSitemap(page = 1): Promise<MetadataRoute.Sitemap> {
  const prefix = (await headers()).get("x-origin");
  let sitemap: MetadataRoute.Sitemap = [];

  const { items, meta } = await api.article.search({
    sort: ["publishedAt:desc"],
    page: page,
    limit: 50,
  });
  items.map((item) => {
    sitemap.push({
      url: `${prefix}/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  console.log(meta);
  if (
    meta.pagination &&
    meta.pagination.pageCount &&
    page < meta.pagination.pageCount
  ) {
    const nextMap = await fetchSitemap(page + 1);
    sitemap = [...sitemap, ...nextMap];
  }

  return sitemap;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const maps = await fetchSitemap();

  console.log(maps.length);
  return maps;
}
