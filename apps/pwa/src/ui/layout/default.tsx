import { PropsWithChildren, Suspense } from "react";
import Navigation from "./navigation";
import menus from "@/common/menus";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-slate-100">
      <Navigation menus={menus} />
      <main className="mx-auto min-h-[90vh] lg:w-3/4 sm:w-full p-4">
        {/* navigation here */}
        <Suspense fallback={<p>Loading</p>}>{children}</Suspense>
      </main>
    </div>
  );
}
