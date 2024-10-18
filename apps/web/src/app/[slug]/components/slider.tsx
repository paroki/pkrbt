"use client";
import { BlockSlider } from "@pkrbt/openapi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { addPrefix } from "@/utils/prefix";

export default function BlockSliderView({ block }: { block: BlockSlider }) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  if (!block.images) {
    return <></>;
  }

  return (
    <div className="flex space-x-5 flex-col md:flex-row">
      <div className="flex-[1]">
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {block.images?.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  priority
                  className="rounded w-full md:w-auto"
                  src={addPrefix(item.url)}
                  alt={item.alternativeText ?? "article image"}
                  width={item.width}
                  height={item.height}
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 400,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
