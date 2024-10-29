import { PUBLIC_URL } from "@/utils/config";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const prefix = PUBLIC_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${prefix}/sitemap.xml`, `${prefix}/berita/sitemap.xml`],
  };
}
