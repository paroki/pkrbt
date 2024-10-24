import { Metadata } from "next";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import { addPrefix } from "./prefix";
import invariant from "tiny-invariant";

export type MetaImage = {
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

export function generateMeta({
  title,
  description,
  image,
  type,
}: Meta): Metadata {
  const images = [];
  const url = "/";
  const origin = "http://localhost:3000";

  invariant(url, "Can not get current url");

  if (image) {
    images.push({
      url: addPrefix(image.url),
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

  const metadata: Metadata = {
    metadataBase: new URL(origin),
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
