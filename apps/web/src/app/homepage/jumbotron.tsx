"use client";
import Image from "next/image";
import type { Homepage, Image as ImageType } from "@pkrbt/openapi";
import { addPrefix } from "@/utils/prefix";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

type Props = {
  homepage: Required<Homepage>;
};

type Images = Array<Required<ImageType>>;

function HomepageSlider({ images }: { images: Images }) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
    <div className="flex-[1]">
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <Image
                priority
                width={item.width}
                height={item.height}
                className="rounded-md w-full"
                alt={item.alternativeText ?? "homepage"}
                src={addPrefix(item?.url ?? "")}
                sizes="100vw"
                style={{
                  display: "block",
                  objectFit: "cover",
                  backgroundColor: "var(--gray-5)",
                  height: 300,
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
export default function Jumbotron({ homepage }: Props) {
  return (
    <div className="flex space-x-5 flex-col md:flex-row">
      {homepage.images && <HomepageSlider images={homepage.images as Images} />}

      <div className="py-4 flex-[1]">
        <h2 className="uppercase font-semibold mb-4 tracking-widest text-xs">
          {homepage.subtitle}
        </h2>
        <h2 className="scroll-m-20 text-xl text-primary-500 font-extrabold tracking-tight lg:text-3xl mb-4">
          {homepage.title}
        </h2>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: homepage.content }}
        />
      </div>
    </div>
  );
}
