import { ImageType } from "@pkrbt/directus";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "alt" | "src"> &
  Pick<Partial<ImageProps>, "alt" | "src"> & {
    image: ImageType;
  };

export default function DirectusImage({ image, ...props }: Props) {
  return (
    <Image
      {...props}
      width={image.width}
      height={image.height}
      alt={image.title}
      src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${image.id}`}
    />
  );
}
