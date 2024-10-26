import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlPrefix = process.env.NEXT_PUBLIC_URL;
  return [
    {
      url: `${urlPrefix}/berita`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${urlPrefix}/dewan-pastoral-paroki`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
  ];
}
