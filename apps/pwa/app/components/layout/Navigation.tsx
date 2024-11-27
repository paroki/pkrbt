import { NavLink, useNavigate } from "@remix-run/react";
import { Button } from "../shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn/sheet";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "~/common/utils";
import { MenuType } from "~/components/types";
import { menu } from "~/config/menu";
import { hasPolicy, isGranted } from "~/pkg/auth/utils";
import { UserContext } from "~/root";

function LayananLink({
  item,
  setOpen,
  user: initial,
}: {
  item: MenuType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: UserContext;
}) {
  const [role] = useState(initial.role);
  const [granted, setGranted] = useState(true);

  const nav = useNavigate();
  const variants = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-500 hover:bg-blue-600",
    orange: "bg-orange-400 hover:bg-orange-500",
  };

  useEffect(() => {
    if (item.role && !isGranted(role, item.role)) {
      setGranted(false);
    }

    if (item.policy && initial.policies) {
      const pols =
        typeof item.policy === "string" ? [item.policy] : item.policy;
      pols.map((item) => {
        if (!hasPolicy(initial.policies, item)) {
          setGranted(false);
        }
      });
    }
  }, [role, item, initial]);

  if (!granted) {
    return null;
  }

  return (
    <Button
      asChild
      className={cn("grow basis-1 h-auto max-w-[116px]", variants[item.color])}
      onClick={() => {
        setOpen(false);
      }}
    >
      <NavLink
        to={item.to}
        className="flex flex-col"
        replace={true}
        onClick={(e) => {
          if (item.label !== "Refresh") return true;
          e.preventDefault();
          nav(item.to);
          setTimeout(() => {
            nav("/");
            window.location.reload();
          }, 1000);
        }}
      >
        <item.icon style={{ width: "24px", height: "24px" }} />
        <span className="text-xs">{item.label}</span>
      </NavLink>
    </Button>
  );
}

export default function Navigation({ user }: { user: UserContext }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"top"} className="max-w-sm p-2 md:p-4">
        <SheetHeader className={cn("space-y-0 items-start mb-2")}>
          <SheetTitle>Layanan</SheetTitle>
          <SheetDescription>daftar layanan informasi</SheetDescription>
        </SheetHeader>
        <div className="max-w-sm grid grid-cols-4 gap-2">
          {menu.map((item, index) => (
            <LayananLink
              key={index}
              item={item}
              setOpen={setOpen}
              user={user}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
