/* eslint-disable @next/next/no-img-element */

import Container from "@/components/ui/container";
import { Article } from "@pkrbt/openapi";
import { Search } from "@/components/ui/search";
import PaginationCustom from "@/components/common/pagination";
import { ArticleItem } from "@/components/articles/article-item";

interface ArticleElProps {
  articles: Article[];
  pageMeta: {
    size: number;
    page?: number;
    search?: string;
  };
}

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
                <ArticleItem article={article} key={index} />
              ))}
            </div>
            {pageMeta.size > 1 && (
              <div className="mt-6">
                <PaginationCustom
                  page={pageMeta.page ?? 1}
                  size={pageMeta.size}
                  search={pageMeta.search}
                />
              </div>
            )}
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
