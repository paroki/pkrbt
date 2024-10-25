import DirectusImage from "@/components/common/image";
import { ImageType } from "@pkrbt/directus";

export default function PostImage({ image }: { image: ImageType }) {
  return (
    <DirectusImage
      priority
      className="rounded-md w-full md:w-auto"
      image={image}
      sizes="(max-height: 600) 100vw"
      style={{
        display: "block",
        objectFit: "cover",
        width: "100%",
        height: 600,
        backgroundColor: "var(--gray-5)",
      }}
    />
  );
}
