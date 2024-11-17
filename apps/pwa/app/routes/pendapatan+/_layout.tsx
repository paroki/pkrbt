import { Separator } from "@radix-ui/react-select";
import { Link, Outlet, useLocation } from "@remix-run/react";
import {
  LucideCalendarDays,
  LucideChurch,
  TableOfContents,
} from "lucide-react";
import { cn } from "~/common/utils";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { useRootOutletContext } from "~/hooks/outlets";

const menu = [
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

  function isActive(route: string) {
    return location.pathname.includes(route);
  }
  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <ul className="flex flex-row gap-x-4">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={cn(
                  "flex gap-x-2 p-2",
                  isActive(item.to) &&
                    "bg-primary text-primary-foreground rounded-t-md border-b-4 border-b-blue-600",
                )}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Separator className="mb-4 border" />
        <Outlet context={context} />
      </div>
    </DefaultLayout>
  );
}
