import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const prefix = process.env.NEXT_PUBLIC_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${prefix}/sitemap.xml`, `${prefix}/berita/sitemap.xml`],
  };
}
