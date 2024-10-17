/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import LinkBtn from "./link";
import { Article } from "@pkrbt/openapi";
import { ArticleItem } from "./article-item";

export default function MainNews({ articles }: { articles: Article[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );
  return (
    <>
      {articles.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {articles.map((article, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 group"
              >
                <ArticleItem article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div>No article.</div>
      )}
      {articles.length > 0 ? (
        <div className="flex justify-end mt-8">
          <LinkBtn name="Selengkapnya" path="/berita" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
