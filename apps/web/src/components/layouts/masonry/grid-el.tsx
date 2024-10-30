'use client';

import * as React from 'react';
import useMasonry from '.';
import Image from 'next/image';
import { PostImage as PostImageType } from '@pkrbt/directus';
import { ASSET_URL } from '@/utils/config';

export default function MasonryGridImage({ data }: { data: PostImageType[] }) {
  const masonryContainer = useMasonry();

  return (
    <div ref={masonryContainer} className="grid items-start gap-4 sm:grid-cols-3 md:gap-6">
      {data.map((img, index) => (
        <Image
          key={index}
          src={`${ASSET_URL}/${img.image.id}`}
          alt={img.image.title}
          height={img.image.height}
          width={img.image.width}
          title={img.image.title}
        />
      ))}
    </div>
  );
}
