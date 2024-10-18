/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { Article } from "@pkrbt/openapi";
import { ArticleItem } from "@/components/articles/article-item";

export default function News({
  articles,
  title,
  className,
}: {
  articles: Article[];
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="uppercase my-4 font-bold text-lg tracking-widest">
        {title}
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleItem article={article} key={index} />
          ))
        ) : (
          <div>No article</div>
        )}
      </div>
    </div>
  );
}
