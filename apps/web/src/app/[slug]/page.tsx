import BlocksView from "@/components/blocks/blocks";
import DateReadable from "@/components/date";
import LatestNews from "@/components/latest-news";
import ShareArticle from "@/components/share-article";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { getArticles } from "@/utils/api";
import api from "@/utils/strapi";
import { TimerIcon } from "lucide-react";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import type { Metadata } from "next";
import type { Article, Image } from "@pkrbt/openapi";
import { generateMeta } from "@/utils/meta";

type Props = {
  params: {
    slug: string;
  };
};

interface BlockProps {
  __component: string;
  id: number;
  body?: string;
}

const getBlockItemBody = (
  blockItem: string,
  blocksArr: BlockProps[],
  callback: (filteredBlocks: BlockProps[]) => (string | undefined)[],
) => {
  const arr = blocksArr.filter((block) => {
    return block?.__component === blockItem;
  });

  return callback(arr);
};

const getArticle = async (slug: string): Promise<Article> => {
  return await api.article.read(slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = (await getArticle(params.slug)) as Required<Article>;
  const image = article.metaImage as Required<Image>;
  return generateMeta({
    title: article.metaTitle,
    description: article.metaDescription,
    type: "article",
    image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = params;

  const article = await getArticle(slug);
  const latestArticles = await getArticles(3);
  const { items: relatedArticle } = await api.article.search({
    filters: {
      category: {
        slug: {
          $eq: article.category?.slug,
        },
      },
    },
    limit: 3,
  });

  if (!article) {
    return notFound();
  }

  const getBody = getBlockItemBody(
    "block.rich-text",
    article.blocks as BlockProps[],
    (blocks) => {
      return blocks.map((block) => {
        return block.body;
      });
    },
  );

  const reading = readingTime(String(getBody[0]));

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3">
          <p className="text-primary-600 font-bold tracking-widest uppercase">
            {article.category ? article.category.name : "Warta Gereja"}
          </p>
        </div>
        <h1 className="font-bold md:text-5xl leading-normal my-6">
          {article.title}
        </h1>
        <div className="flex gap-1 sm:gap-5 my-4 sm:items-center flex-col sm:flex-row items-start text-gray-500">
          <DateReadable isoDate={article.publishedAt as string} showIcon year />
          <div className="flex items-center gap-3">
            <TimerIcon className="w-4 h-4" /> <p>{reading.text}</p>
          </div>
        </div>
        <Separator className="my-2 bg-gray-200" />
        {/* start content */}
        <BlocksView
          blocks={article.blocks}
          className="mt-4 leading-loose text-lg"
        />
        {/* end content */}
        <ShareArticle />
        <LatestNews articles={latestArticles} title="Tulisan Terbaru" />
        <Separator className="my-5 bg-gray-200" />
        <LatestNews
          articles={relatedArticle}
          className="mt-5"
          title={`Lihat Kategori ${article.category?.name} Lainnya:`}
        />
      </div>
    </Container>
  );
}
