import BlocksView from "@/app/[slug]/components/blocks";
import DateReadable from "@/components/common/date";
import LatestNews from "@/app/[slug]/components/latest-news";
import ShareArticle from "@/app/[slug]/components/share-article";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import type { Metadata } from "next";
import { generateMeta, MetaImage } from "@/utils/meta";
import { directus } from "@/utils/directus";
import { BlockMarkdown, ImageType, PostBlock } from "@pkrbt/directus";
import PostImages from "./components/post-images";
import PostImage from "./components/post-image";
import { SolarUserBoldDuotone } from "@/components/icons/user";
import { PostImage as PostImageType } from "@pkrbt/directus";
import MasonryGridImage from "@/components/layouts/masonry/grid-el";
import DirectusImage from "@/components/common/image";

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

export const dynamic = "force-dynamic";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { item, error } = await directus.post.readBySlug(params.slug);

  if (error) {
    Promise.reject(error.cause);
  }
  const seo = item?.seo;

  return await generateMeta({
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

  const writer = {
    // @ts-expect-error fix later
    firstName: post?.createdBy!.first_name ?? "",
    // @ts-expect-error fix later
    lastName: post?.createdBy!.last_name ?? "",
  };

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
      const item: BlockMarkdown = block.item;
      return item.body as string;
    });
  });
  const reading = readingTime(getBody[0] || "");

  function MasonryImage({ data }: { data: PostImageType[] }) {
    return <MasonryGridImage data={data} />;
  }

  function PostHeader() {
    return (
      <>
        <div className="flex items-center gap-3">
          <p className="text-primary-600 font-bold tracking-widest uppercase">
            {post?.category ? post.category.title : "Warta Gereja"}
          </p>
        </div>
        <h1 className="font-bold md:text-5xl leading-normal mt-6">
          {post?.title}
        </h1>
        {/* {post?.category?.title !== 'Galeri' ? <p className="mb-6 text-gray-500 italic">{post?.summary}</p> : ''} */}
        <div className="flex gap-5 items-center border-b border-gray-100 py-2 mb-4">
          <div>
            {post?.createdBy?.avatar ? (
              <DirectusImage
                image={post.createdBy.avatar}
                className="w-9 h-9"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <SolarUserBoldDuotone className="w-8 h-8 text-gray-500" />
            )}
          </div>

          <div>
            <p>
              {writer.firstName ?? "Admin"} {writer.lastName ?? ""}
            </p>
            <div className="flex gap-3 text-sm items-center text-gray-500">
              <DateReadable isoDate={post?.publishedAt as string} year />
              {reading && getBody[0] && (
                <>
                  <div className="w-[2px] h-[2px] bg-gray-400 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <p>{reading.text}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <PostHeader />
        {post.images?.length && post.category?.title === "Galeri" ? (
          <MasonryImage data={post.images} />
        ) : post.images?.length && post.category?.title !== "Galeri" ? (
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
          title={`Tulisan Terkait:`}
        />
        <Separator className="my-5 bg-gray-200" />
        <LatestNews posts={latestPosts} title="Tulisan Terbaru" />
      </div>
    </Container>
  );
}
