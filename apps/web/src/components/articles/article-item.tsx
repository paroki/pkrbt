/* eslint-disable @next/next/no-img-element */
import type { Article } from "@pkrbt/openapi";
import { Box, Card, Inset } from "@radix-ui/themes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import DateReadable from "../common/date";
import { addPrefix } from "@/utils/prefix";
import Image from "next/image";

export function ArticleItem({ article }: { article: Article }) {
  return (
    <Link href={`/${article.slug ?? "no-slug"}`} className="hover:text-inherit">
      {/* TODO: every article should have slug! remove line above */}
      <Box
        maxWidth="240px"
        className="group bg-white border border-slate-200 rounded-md drop-shadow-md"
      >
        <Card size="2">
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            className="relative overflow-hidden rounded-t-md"
          >
            <div className="absolute w-full h-full bg-primary-400 opacity-0 group-hover:opacity-50 top-0 flex justify-center items-center transition-all">
              <EyeIcon className="text-white w-9 h-9" />
            </div>
            <div className="absolute top-2 right-2 p-1 tracking-wider bg-slate-950 opacity-50 uppercase text-white text-xs">
              <p>{article.category ? article.category.name : "Warta Gereja"}</p>
            </div>
            <Image
              width={article.metaImage?.width ?? 900}
              height={article.metaImage?.height ?? 497}
              src={
                article.metaImage?.url
                  ? addPrefix(article.metaImage.url)
                  : "/static/noimg.jpg"
              }
              alt={`image for ${article.title}`}
              sizes="100vw"
              style={{
                display: "block",
                objectFit: "cover",
                backgroundColor: "var(--gray-5)",
                height: 200,
              }}
            />
          </Inset>
          <div className="p-2">
            <h3 className="my-1 text-lg group-hover:text-primary-600">
              {article.title}
            </h3>
            <p className="text-base hover:text-inherit">
              {article.description?.substring(0, 75)}...
            </p>
            <DateReadable
              isoDate={article.publishedAt as string}
              showIcon
              className="text-sm my-2"
            />
          </div>
        </Card>
      </Box>
    </Link>
  );
}
