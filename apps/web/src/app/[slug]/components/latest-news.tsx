/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { PostItem } from "@/components/posts/post-item";
import { Post } from "@pkrbt/directus";

export default function News({
  posts,
  title,
  className,
}: {
  posts: Post[];
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="uppercase my-4 font-bold text-lg tracking-widest">
        {title}
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((article, index) => <PostItem post={article} key={index} />)
        ) : (
          <div>No article</div>
        )}
      </div>
    </div>
  );
}
