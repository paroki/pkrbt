"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { BlockHero, BlockHeroImages, Page } from "@pkrbt/directus";
import DirectusImage from "@/components/common/image";
import { DM_Serif_Text } from "next/font/google";

type Props = {
  homepage: Page;
};

type Images = Array<Required<BlockHeroImages>>;

const customFont = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
});

function HomepageSlider({ images }: { images: Images }) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
    <div className="flex-[1]">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <DirectusImage
                priority
                image={item.image}
                className="rounded-md w-full"
                sizes="(max-width: 640px) 100vw"
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

function HomepageHero({ item }: { item: BlockHero }) {
  const fontClass = customFont ? customFont.className : "";
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <HomepageSlider images={item.images as Images} />
      <div className="flex-[1] rounded-md p-4">
        <h2 className="uppercase text-primary-600 font-semibold mb-4 tracking-widest text-xs">
          {item.subtitle}
        </h2>
        <h2
          className={`scroll-m-20 tracking-tight lg:text-4xl mb-4 ${fontClass}`}
        >
          {item.title}
        </h2>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: item.content as string }}
        />
      </div>
    </div>
  );
}

export default function Jumbotron({ homepage }: Props) {
  return (
    <>
      {homepage.blocks?.map((block, index) => (
        <div key={index}>
          {block.collection == "block_hero" && (
            <HomepageHero item={block.item as BlockHero} />
          )}
        </div>
      ))}
    </>
  );
}
