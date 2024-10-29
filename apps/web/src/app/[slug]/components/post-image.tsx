import DirectusImage from '@/components/common/image';
import { ImageType } from '@pkrbt/directus';

export default function PostImage({ image }: { image: ImageType }) {
  return (
    <DirectusImage
      priority
      className="rounded-md w-full md:w-auto"
      image={image}
      style={{
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--gray-5)'
      }}
    />
  );
}
