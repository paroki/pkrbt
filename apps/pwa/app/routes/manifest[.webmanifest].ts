import type { WebAppManifest } from "@remix-pwa/dev";
import { json } from "@remix-run/node";

export const loader = () => {
  return json(
    {
      id: "/",
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
    } as WebAppManifest,
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    },
  );
};
