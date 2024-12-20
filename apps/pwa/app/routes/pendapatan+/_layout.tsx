import { Separator } from "@radix-ui/react-select";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { LucideCalendar, LucideChurch, LucideSigmaSquare } from "lucide-react";
import { cn } from "~/common/utils";
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
    icon: LucideCalendar,
  },
  {
    label: "Rekap",
    to: "/pendapatan/laporan",
    icon: LucideSigmaSquare,
  },
];

export default function Layout() {
  const location = useLocation();
  const context = useRootOutletContext();
  function isActive(route: string) {
    return location.pathname.includes(route);
  }
  return (
    <div className="container mx-auto">
      <ul className="flex flex-row gap-x-4">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className={cn(
                "flex gap-x-2 p-2",
                isActive(item.to) &&
                  "bg-primary text-primary-foreground rounded-t-md border-b-4 border-b-orange-400",
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
  );
}
