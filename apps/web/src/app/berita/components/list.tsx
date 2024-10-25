/* eslint-disable @next/next/no-img-element */

import Container from "@/components/ui/container";
import { Search } from "@/components/ui/search";
import PaginationCustom from "@/components/common/pagination";
import { PostItem } from "@/components/posts/post-item";
import { Post } from "@pkrbt/directus";

interface PostProps {
  posts: Post[];
  pageMeta: {
    size: number;
    page?: number;
    keyword?: string;
  };
}

export default function PostList({ posts, pageMeta }: PostProps) {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <h2 className="uppercase tracking-widest font-bold">Warta Paroki</h2>
        <p>
          {pageMeta.keyword ? (
            <>
              Berikut hasil pencarian{" "}
              <span className="font-bold">{pageMeta.keyword}</span>
            </>
          ) : (
            "Berikut artikel terkini PKRBT"
          )}
        </p>
        <Search />
        {posts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-sm">
              {posts.map((post, index) => (
                <PostItem post={post} key={index} />
              ))}
            </div>
            {pageMeta.size > 1 && (
              <div className="mt-6">
                <PaginationCustom
                  page={pageMeta.page ?? 1}
                  size={pageMeta.size}
                  search={pageMeta.keyword}
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
