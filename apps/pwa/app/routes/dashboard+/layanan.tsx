import { Link, useOutletContext } from "@remix-run/react";
import { BadgeDollarSignIcon, LucideLogOut, UserCog2Icon } from "lucide-react";
import { isGranted } from "~/common/utils";
import { Button } from "~/components/shadcn/button";
import { RootOutletContext } from "~/root";

export type MenuItem = {
  label: string;
  to: string;
  icon: JSX.Element;
  policy?: string[];
};

export default function Page() {
  const { user, userPolicies } = useOutletContext<RootOutletContext>();
  const menu = [
    {
      label: "Biodata",
      to: "/user/biodata",
      icon: UserCog2Icon,
    },
    {
      label: "Pendapatan",
      to: "/pendapatan/misa",
      icon: BadgeDollarSignIcon,
      policy: [userPolicies.pengurusHarianDPP],
    },
    {
      label: "Keluar",
      to: "/logout",
      icon: LucideLogOut,
    },
  ];
  return (
    <div className="flex bg-white rounded-md drop-shadow-md border p-2 gap-x-2 gap-y-2">
      {menu.map((item, index) => (
        <div key={index}>
          {isGranted(user.policies, item.policy) && (
            <Button asChild variant={"outline"}>
              <Link
                to={item.to}
                className="w-24 h-24 flex-col text-xs"
                viewTransition
              >
                <item.icon />
                {item.label}
              </Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
