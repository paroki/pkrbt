import type { WebAppManifest } from "@remix-pwa/dev";
import { json } from "@remix-run/node";
import { PUBLIC_URL } from "~/services/config.server";

export const loader = () => {
  return json(
    {
      id: PUBLIC_URL,
      short_name: "PKRBT",
      name: "PKRBT",
      description:
        "Aplikasi Layanan Informasi Paroki Kristus Raja Barong Tongkok",
      start_url: "/",
      display: "standalone",
      background_color: "#FFFFFF",
      theme_color: "#000000",
      icons: [
        {
          src: "/192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "screenshot-1.jpg",
          sizes: "720x1544",
          type: "image/jpg",
          label: "Daftar user",
        },
        {
          src: "screenshot-2.png",
          sizes: "1920x1080",
          type: "image/png",
          form_factor: "wide",
          label: "Daftar kegiatan",
        },
      ],
    } as WebAppManifest,
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    },
  );
};
