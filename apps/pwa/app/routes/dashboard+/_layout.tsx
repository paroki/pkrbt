import { Link, Outlet, useLocation, useOutletContext } from "@remix-run/react";
import { CogIcon, HomeIcon } from "lucide-react";
import { cn } from "~/common/utils";
import DefaultLayout from "~/components/layout/Default";
import { Button } from "~/components/shadcn/button";
import { RootOutletContext } from "~/root";

const menu = [
  {
    label: "Kegiatan",
    to: "/dashboard/kegiatan",
    icon: HomeIcon,
  },
  {
    label: "Layanan",
    to: "/dashboard/layanan",
    icon: CogIcon,
  },
];

export default function Page() {
  const location = useLocation();
  const context = useOutletContext<RootOutletContext>();

  return (
    <DefaultLayout>
      <div className="flex flex-col w-full gap-y-4">
        <nav className="flex flex-row w-full bg-white p-2 gap-x-4 border rounded-md drop-shadow-md">
          {menu.map((item, index) => (
            <Button
              asChild
              variant={"outline"}
              key={index}
              className={cn(
                `${location.pathname === item.to && "bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white"}`,
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

        <div>
          <Outlet context={{ ...context }} />
        </div>
      </div>
    </DefaultLayout>
  );
}
