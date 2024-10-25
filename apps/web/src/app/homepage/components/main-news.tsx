/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import LinkBtn from "@/components/common/link";
import { PostItem } from "@/components/posts/post-item";
import { Post } from "@pkrbt/directus";

export default function MainNews({ posts }: { posts: Post[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );
  return (
    <>
      {posts.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="py-2">
            {posts.map((post, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 group"
              >
                <PostItem post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div>No article.</div>
      )}
      {posts.length > 0 ? (
        <div className="flex justify-end mt-8">
          <LinkBtn name="Selengkapnya" path="/berita" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
