"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "./session";
import LayoutProvider from "./layout";

export default function Providers({ children }: {} & PropsWithChildren) {
  return (
    <SessionProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </SessionProvider>
  );
}
