import { MetadataRoute } from "next";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export default function sitemap(): MetadataRoute.Sitemap {
  const urlPrefix = (headers() as unknown as UnsafeUnwrappedHeaders).get("x-origin");
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
