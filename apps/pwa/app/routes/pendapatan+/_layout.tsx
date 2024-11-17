import { Link, Outlet, useLocation } from "@remix-run/react";
import {
  LucideCalendarDays,
  LucideChurch,
  LucideSkipBack,
  TableOfContents,
} from "lucide-react";
import { cn } from "~/common/utils";
import DefaultLayout from "~/components/layout/Default";
import { Button } from "~/components/shadcn/button";
import { useRootOutletContext } from "~/hooks/outlets";

const menu = [
  {
    label: "",
    to: "/dashboard/layanan",
    icon: LucideSkipBack,
  },
  {
    label: "Misa",
    to: "/pendapatan/misa",
    icon: LucideChurch,
  },
  {
    label: "Harian",
    to: "/pendapatan/harian",
    icon: LucideCalendarDays,
  },
  {
    label: "Laporan",
    to: "/pendapatan/laporan",
    icon: TableOfContents,
  },
];

export default function Page() {
  const location = useLocation();
  const context = useRootOutletContext();
  return (
    <DefaultLayout>
      <div className="flex flex-col w-full gap-y-4">
        <nav className="flex flex-row flex-wrap w-full bg-white p-2 gap-x-2 border rounded-md drop-shadow-md">
          {menu.map((item, index) => (
            <Button
              asChild
              variant={"outline"}
              key={index}
              className={cn(
                `${location.pathname.includes(item.to) && "bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white"}`,
              )}
              disabled={location.pathname === item.to}
            >
              <Link to={item.to} viewTransition>
                <item.icon />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <Outlet context={context} />
      </div>
    </DefaultLayout>
  );
}
