import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/shadcn/components/sidebar";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import NavMain from "./NavMain";
import { NavMenu } from "../config/nav";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href={"/dashboard"}>
                <HomeIcon className="size-5!" />
                <span className="text-base font-semibold">PKRBT</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavMenu} />
      </SidebarContent>
    </Sidebar>
  );
}
