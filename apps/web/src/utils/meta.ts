import { Metadata } from "next";
import { Image } from "@pkrbt/openapi";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import { addPrefix } from "./prefix";
import { headers } from "next/headers";
import invariant from "tiny-invariant";

export type ParokiMeta = {
  title: string;
  description: string;
  image: Required<Image>;
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

  invariant(url, "Can not get current url");

  if (image) {
    images.push({
      url: addPrefix(image.url),
      width: image.width,
      height: image.height,
      alt: image.alternativeText,
    });
  }

  const metadata: Metadata = {
    title: `PKRBT - ${title}`,
    description,
    openGraph: {
      title,
      description,
      type,
      images,
      url,
      countryName: "indonesia",
      locale: "id",
    },
    twitter: {
      images,
    },
  };

  return metadata;
}