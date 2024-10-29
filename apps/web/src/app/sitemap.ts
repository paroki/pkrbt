import { PUBLIC_URL } from "@/utils/config";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlPrefix = PUBLIC_URL;
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
