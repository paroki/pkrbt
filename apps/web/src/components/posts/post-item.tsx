import { Box, Card, Inset } from '@radix-ui/themes';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import DateReadable from '../common/date';
import { Post } from '@pkrbt/directus';
import DirectusImage from '../common/image';

export function PostItem({ post }: { post: Post }) {
  return (
    <Link href={`/${post.slug}`} className="hover:text-inherit">
      <Box maxWidth="240px" className="group bg-white border border-slate-100 rounded-md shadow-sm">
        <Card size="2">
          <Inset clip="padding-box" side="top" pb="current" className="relative overflow-hidden rounded-t-md">
            <div className="absolute w-full h-full bg-primary-400 opacity-0 group-hover:opacity-50 top-0 flex justify-center items-center transition-all">
              <EyeIcon className="text-white w-9 h-9" />
            </div>
            <div className="absolute top-2 right-2 p-1 tracking-wider bg-slate-950 opacity-50 uppercase text-white text-xs">
              <p>{post.category ? post.category.title : 'Warta Gereja'}</p>
            </div>
            {post.cover && (
              <DirectusImage
                image={post.cover}
                sizes="100vw"
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  backgroundColor: 'var(--gray-5)',
                  height: 200
                }}
              />
            )}
          </Inset>
          <div className="p-2">
            <h3 className="my-1 text-lg group-hover:text-primary-600">{post.title}</h3>
            <p className="text-base hover:text-inherit">{post.summary?.substring(0, 200)}...</p>
            <DateReadable isoDate={post.publishedAt as string} showIcon className="text-sm my-2" />
          </div>
        </Card>
      </Box>
    </Link>
  );
}
