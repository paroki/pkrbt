/* eslint-disable @next/next/no-img-element */

import Container from "@/components/ui/container";
import { Box, Inset, Card } from "@radix-ui/themes";
import Link from "next/link";
import { Article } from "@pkrbt/openapi";
import { Search } from "../ui/search";
import PaginationCustom from "../pagination";
import DateReadable from "../date";
import { addPrefix } from "@/utils/prefix";
import Image from "next/image";

interface ArticleElProps {
  articles: Article[];
  pageMeta: {
    size: number;
    page?: number;
    search?: string;
  };
}

export const ListView = ({ article }: { article: Article }) => {
  return (
    <Box
      maxWidth="240px"
      className="overflow-hidden group transition-all hover:scale-[1.01] bg-white border border-slate-200 drop-shadow-md rounded-md"
    >
      <Card size="2" className="relative">
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src={
              article.metaImage?.url
                ? addPrefix(article.metaImage.url)
                : "/static/noimg.jpg"
            }
            alt="Bold typography"
            width={article.metaImage?.width ?? 605}
            height={article.metaImage?.height ?? 334}
            sizes="100vw"
            style={{
              display: "block",
              objectFit: "cover",
              backgroundColor: "var(--gray-5)",
              height: "200px",
            }}
          />
        </Inset>
        <div className="p-2">
          <div className="absolute top-2 right-2 bg-slate-950 opacity-50 p-1 tracking-wider uppercase text-white rounded text-xs">
            <p>{article.category ? article.category.name : "Warta Gereja"}</p>
          </div>
          <div>
            <h3 className="text-base mb-2 group-hover:text-primary-600">
              {article.title}
            </h3>
            <p>{article.metaDescription?.substring(0, 85)}...</p>
            <div className="mt-4 text-gray-500 w-full">
              <DateReadable isoDate={article.publishedAt as string} />
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default function ArticleList({ articles, pageMeta }: ArticleElProps) {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <h2 className="uppercase tracking-widest font-bold">Warta Paroki</h2>
        <p>
          {pageMeta.search ? (
            <>
              Berikut hasil pencarian{" "}
              <span className="font-bold">{pageMeta.search}</span>
            </>
          ) : (
            "Berikut artikel terkini PKRBT"
          )}
        </p>
        <Search />
        {articles.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-sm">
              {articles.map((article, index) => (
                <Link
                  key={index}
                  href={`/${article.slug}`}
                  className="hover:text-inherit"
                >
                  <ListView article={article} />
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <PaginationCustom
                page={pageMeta.page ?? 1}
                size={pageMeta.size}
                search={pageMeta.search}
              />
            </div>
          </>
        ) : (
          <p className="w-full text-center text-gray-400 p-6">
            Wah kami tidak menemukan artikel dengan pencarian tersebut ...
          </p>
        )}
      </div>
    </Container>
  );
}
