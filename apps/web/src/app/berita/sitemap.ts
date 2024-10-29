import { PUBLIC_URL } from "@/utils/config";
import { directus } from "@/utils/directus";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

async function fetchSitemap(page = 1): Promise<MetadataRoute.Sitemap> {
  let sitemap: MetadataRoute.Sitemap = [];

  const { items, meta } = await directus.post.search({
    sort: ["-publishedAt"],
    page: page,
    limit: 50,
  });
  items.map((item) => {
    sitemap.push({
      url: PUBLIC_URL + "/" + item.slug,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  if (meta?.page && meta.pageSize && page < meta.pageSize) {
    const nextMap = await fetchSitemap(page + 1);
    sitemap = [...sitemap, ...nextMap];
  }

  return sitemap;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const maps = await fetchSitemap();
  return maps;
}
