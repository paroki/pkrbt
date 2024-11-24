import { NavLink, Outlet } from "@remix-run/react";
import { LucideBell, LucideHome } from "lucide-react";
import { cn } from "~/common/utils";
import Container from "~/components/layout/Container";
import { Separator } from "~/components/shadcn/separator";
import { useRootOutletContext } from "~/hooks/outlets";

const menu = [
  { to: "/dashboard/agenda", icon: LucideHome },
  { to: "/dashboard/notifications", icon: LucideBell },
];
export default function Layout() {
  const context = useRootOutletContext();
  return (
    <Container>
      <div className="flex flex-row gap-x-2">
        {menu.map((item, index) => (
          <NavLink
            key={`menu-${index}`}
            to={item.to}
            className={({ isActive }) => {
              const style = isActive
                ? "bg-black text-white border-b-4 border-b-orange-400"
                : "";
              return cn("p-1", "rounded-t-md", style);
            }}
            viewTransition
            caseSensitive
          >
            <item.icon style={{ width: 24, height: 24 }} />
          </NavLink>
        ))}
      </div>
      <Separator className="mb-2" />
      <Outlet context={context} />
    </Container>
  );
}
