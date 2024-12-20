import { BlockMarkdown } from "@pkrbt/directus";
import { remark } from "remark";
import html from "remark-html";

export default function BlockMarkdownView({ block }: { block: BlockMarkdown }) {
  if (!block.body) {
    return <p>no-content</p>;
  }

  const content = remark().use(html).processSync(block.body).toString();

  return (
    <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
