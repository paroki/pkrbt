import { UserIcon } from "lucide-react";
import { Outlet } from "react-router";
import { TopNavBar, type TopNavBarMenu } from "shared/ui";

export function UserLayout() {
  const menus = [
    {
      url: "/user",
      icon: UserIcon,
      label: "Users",
    },
  ] satisfies TopNavBarMenu[];
  return (
    <div>
      <TopNavBar menus={menus} />
      <Outlet />
    </div>
  );
}
