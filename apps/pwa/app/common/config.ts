import { LoaderCircleIcon } from "lucide-react";

export const siteConfig = {
  name: "pkrbt",
  url: "https://pwa.pkrbt.id",
  ogImage: "https://pwa.pkrbt.id/192x192.png",
  description: "Aplikasi layanan informasi Paroki Kristus Raja Barong Tongkok",
};

export const CacheConfig = {
  keys: {
    permissions: "permissions",
    policies: "policies",
    roles: "roles",
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const LoaderIcon = LoaderCircleIcon;
