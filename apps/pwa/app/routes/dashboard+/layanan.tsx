import { Link, useOutletContext } from "@remix-run/react";
import {
  BadgeDollarSignIcon,
  LucideLogOut,
  LucideUniversity,
  UserCog2Icon,
  Users2Icon,
} from "lucide-react";
import { isGranted } from "~/common/utils";
import { Button } from "~/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
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
      label: "Kegiatan",
      to: "/under-construction",
      icon: Users2Icon,
    },
    {
      label: "Pendapatan",
      to: "/pendapatan/misa",
      icon: BadgeDollarSignIcon,
      policy: [userPolicies.pengurusHarianDPP],
    },
    {
      label: "Organisasi",
      to: "/under-construction",
      icon: LucideUniversity,
    },
    {
      label: "User",
      to: "/under-construction",
      icon: Users2Icon,
    },
    {
      label: "Keluar",
      to: "/logout",
      icon: LucideLogOut,
    },
  ];
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Daftar Layanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-x-2">
          {menu.map((item, index) => (
            <div key={index}>
              {isGranted(user.policies, item.policy) && (
                <Button asChild variant={"outline"}>
                  <Link
                    to={item.to}
                    className="w-24 h-24 flex-col"
                    viewTransition
                  >
                    <item.icon className="w-12 h-12" />
                    <span className="text-balance">{item.label}</span>
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
