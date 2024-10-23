import { MetadataRoute } from "next";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const prefix = (headers() as unknown as UnsafeUnwrappedHeaders).get("x-origin");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${prefix}/sitemap.xml`, `${prefix}/berita/sitemap.xml`],
  };
}
