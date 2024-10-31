import { Metadata } from "next";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import { ASSET_URL, PUBLIC_URL } from "./config";
import { headers } from "next/headers";

export type MetaImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  title: string;
  description: string;
};

export type Meta = {
  title?: string | null;
  description?: string | null;
  image?: MetaImage | null;
  type: OpenGraphType;
};

export async function generateMeta({
  title,
  description,
  image,
  type,
}: Meta): Promise<Metadata> {
  const images = [];
  const header = await headers();
  const url = header.get("x-current-url") as string;
  const origin = PUBLIC_URL;

  if (image) {
    images.push({
      url: `${ASSET_URL}/${image.id}`,
      width: image.width,
      height: image.height,
      alt: image.title,
    });
  } else {
    images.push({
      url: `${origin}/logo.png`,
      width: 64,
      heigth: 64,
      alt: "PKRBT Logo",
    });
  }

  title = title ?? "PKRBT";
  description = description ?? "Website Paroki Kristus Raja Barong Tongkok";

  const metadata: Metadata = {
    metadataBase: new URL(PUBLIC_URL),
    title: `${title} | PKRBT`,
    description,
    openGraph: {
      title,
      description,
      type,
      images,
      url,
      countryName: "indonesia",
      locale: "id",
      siteName: "pkrbt",
    },
    twitter: {
      images,
    },
  };

  return metadata;
}
