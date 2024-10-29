'use client';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import PostImage from './post-image';
import { PostImage as PostImageType } from '@pkrbt/directus';

export default function PostImages({ images }: { images: PostImageType[] }) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <div className="flex space-x-5 flex-col md:flex-row">
      <div className="flex-[1]">
        <Carousel
          opts={{
            align: 'start',
            loop: true
          }}
          plugins={[plugin.current]}
          className="w-full">
          <CarouselContent>
            {images.map((item, index) => (
              <CarouselItem key={index}>
                <PostImage image={item.image} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
