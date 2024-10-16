import { Metadata } from "next";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import { addPrefix } from "./prefix";
import { headers } from "next/headers";
import invariant from "tiny-invariant";

export type MetaImage = {
  url: string;
  width: number;
  height: number;
  alternativeText: string;
};

export type ParokiMeta = {
  title: string;
  description: string;
  image?: MetaImage;
  type: OpenGraphType;
};

export function generateMeta({
  title,
  description,
  image,
  type,
}: ParokiMeta): Metadata {
  const images = [];
  const headerList = headers();
  const url = headerList.get("x-current-url");
  const origin = headerList.get("x-origin") ?? "http://localhost:3000";

  invariant(url, "Can not get current url");

  if (image) {
    images.push({
      url: addPrefix(image.url),
      width: image.width,
      height: image.height,
      alt: image.alternativeText,
    });
  } else {
    images.push({
      url: `${origin}/logo.png`,
      width: 512,
      heigth: 512,
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
