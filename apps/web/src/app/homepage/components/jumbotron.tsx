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

type Props = {
  homepage: Page;
};

type Images = Array<Required<BlockHeroImages>>;

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
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <HomepageSlider images={item.images as Images} />
      <div className="flex-[1] bg-white border border-slate-200 drop-shadow-lg rounded-md p-4">
        <h2 className="uppercase font-semibold mb-4 tracking-widest text-xs">
          {item.subtitle}
        </h2>
        <h2 className="scroll-m-20 text-xl text-primary-500 font-extrabold tracking-tight lg:text-3xl mb-4">
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
