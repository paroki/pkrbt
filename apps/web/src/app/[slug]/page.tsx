import BlocksView from "@/app/[slug]/components/blocks";
import DateReadable from "@/components/common/date";
import LatestNews from "@/app/[slug]/components/latest-news";
import ShareArticle from "@/app/[slug]/components/share-article";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { TimerIcon } from "lucide-react";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import type { Metadata } from "next";
import { generateMeta, MetaImage } from "@/utils/meta";
import { directus } from "@/utils/directus";
import { ImageType, PostBlock } from "@pkrbt/directus";
import PostImages from "./components/post-images";
import PostImage from "./components/post-image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const getBlockItemBody = (
  blockItem: string,
  blocksArr: PostBlock[],
  callback: (filteredBlocks: PostBlock[]) => string[],
) => {
  const arr = blocksArr.filter((block) => {
    return block.collection === blockItem;
  });

  return callback(arr);
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { item, error } = await directus.post.readBySlug(params.slug);
  if (error) {
    Promise.reject(error.cause);
  }
  const seo = item?.seo;

  return generateMeta({
    title: seo?.title,
    description: seo?.description,
    type: "article",
    image: seo?.image as MetaImage,
  });
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { slug } = params;

  const { item: post, error } = await directus.post.readBySlug(slug);

  if (error) {
    Promise.reject(error);
  }
  const { items: latestPosts } = await directus.post.search({ limit: 3 });
  const { items: relatedPost, error: categoryError } =
    await directus.post.search({
      category: post?.category?.id,
      limit: 3,
    });
  if (categoryError) Promise.reject(categoryError.cause);

  if (!post) {
    return notFound();
  }

  const getBody = getBlockItemBody("block_markdown", post.blocks, (blocks) => {
    return blocks.map((block) => {
      return block.item.body as string;
    });
  });
  const reading = readingTime(getBody[0]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3">
          <p className="text-primary-600 font-bold tracking-widest uppercase">
            {post.category ? post.category.title : "Warta Gereja"}
          </p>
        </div>
        <h1 className="font-bold md:text-5xl leading-normal my-6">
          {post.title}
        </h1>
        <div className="flex gap-1 sm:gap-5 my-4 sm:items-center flex-col sm:flex-row items-start text-gray-500">
          <DateReadable isoDate={post.publishedAt as string} showIcon year />
          {reading && (
            <div className="flex items-center gap-3">
              <TimerIcon className="w-4 h-4" /> <p>{reading.text}</p>
            </div>
          )}
        </div>
        <Separator className="my-2 bg-gray-200" />
        {post.images ? (
          <PostImages images={post.images} />
        ) : (
          <PostImage image={post.cover as ImageType} />
        )}
        {/* start content */}
        {post.blocks && (
          <BlocksView
            blocks={post.blocks}
            className="mt-4 leading-loose text-lg"
          />
        )}
        {/* end content */}
        <ShareArticle />
        <LatestNews
          posts={relatedPost}
          className="mt-5"
          title={`Lihat Kategori ${post.category?.title} Lainnya:`}
        />
        <Separator className="my-5 bg-gray-200" />
        <LatestNews posts={latestPosts} title="Tulisan Terbaru" />
      </div>
    </Container>
  );
}
