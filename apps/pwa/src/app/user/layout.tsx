import DefaultLayout from "@/components/layout/default";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
