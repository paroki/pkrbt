import { Metadata } from "next";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

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
  const url = "/";
  const origin = process.env.NEXT_PUBLIC_URL as string;

  if (image) {
    images.push({
      url: `${process.env.NEXT_PUBLIC_ASSET_URL}/${image.id}`,
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_URL ?? "https://dev.pkrbt.id",
    ),
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
