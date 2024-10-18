/* eslint-disable jsx-a11y/alt-text */
"use client";

import { BlockImage } from "@pkrbt/openapi";
import Image from "next/image";
import { addPrefix } from "@/utils/prefix";

export default function BlockImageView({ block }: { block: BlockImage }) {
  const image = block.image;
  return (
    <Image
      src={addPrefix(image.url)}
      alt={image.alternativeText ?? "no alternative text"}
      width={image.width}
      height={image.height}
    />
  );
}
