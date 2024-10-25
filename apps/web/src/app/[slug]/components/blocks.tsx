"use client";

import BlockMarkdownView from "./markdown";
import { PostBlock } from "@pkrbt/directus";

type Props = {
  blocks: PostBlock[];
  className?: string;
};

function BlockItem({ block }: { block: PostBlock }) {
  const collection = block.collection;
  const item = block.item;

  if ("block_markdown" === collection) {
    return BlockMarkdownView({ block: item });
  }
  throw Error("Unsupported block type");
}

export default function BlocksView({ blocks, className }: Props) {
  return (
    <div className={className}>
      {blocks?.map((block, index) => (
        <div key={index} className="mb-4">
          <BlockItem block={block} />
        </div>
      ))}
    </div>
  );
}
