import type { PropsWithChildren } from "react";
import type { User } from "@pkrbt/database";
import { cn } from "~/lib/utils";
import Header from "./Header";

export default function DefaultLayout({
  children,
  user,
}: {
  user: User;
} & PropsWithChildren) {
  return (
    <div
      data-wrapper=""
      className="border-border/40 dark:border-border"
    >
      <div className="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-384 min-[1800px]:border-x">
        <Header user={user} />
        <main className={cn("flex-1 px-2 mt-2 md:p-0")}>{children}</main>
        <div className="flex flex-row grow w-full h-24"></div>
      </div>
    </div>
  );
}
