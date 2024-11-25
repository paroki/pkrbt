import {
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  tablePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { ComponentProps, useRef } from "react";
import "@mdxeditor/editor/style.css";
import { ClientOnly } from "remix-utils/client-only";

type Props = ComponentProps<typeof MDXEditor>;

export default function MarkdownInput({ ...props }: Props) {
  const ref = useRef(null);

  return (
    <ClientOnly>
      {() => (
        <div className="flex w-full border rounded-md">
          <MDXEditor
            {...props}
            plugins={[
              headingsPlugin(),
              tablePlugin(),
              listsPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <BoldItalicUnderlineToggles />
                    <InsertTable />
                    <ListsToggle />
                    <CreateLink />
                  </>
                ),
              }),
            ]}
            ref={ref}
            className="w-full h-full"
          />
        </div>
      )}
    </ClientOnly>
  );
}
