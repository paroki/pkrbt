"use client";
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/shadcn/components/sidebar";
import { PropsWithChildren } from "react";
import SiteHeader from "./SiteHeader";
import AppSidebar from "./AppSidebar";
import Providers from "../context/providers";

export function Layout({ children }: {} & PropsWithChildren) {
  return (
    <Providers>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
