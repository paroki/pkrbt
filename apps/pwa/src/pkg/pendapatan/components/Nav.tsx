"use client";
import { usePathname } from "next/navigation";
import routes from "../routes";
import { Button } from "@pkrbt/ui/shadcn/button";
import { Calendar1Icon, ChurchIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@pkrbt/ui/utils/ui";

export default function Nav() {
  const pathname = usePathname();
  return (
    <span className="flex gap-2 left-0">
      <Button
        asChild
        className={cn([
          "flex-row",
          `${pathname.includes(routes.harian.href) && "bg-blue-600"}`,
        ])}
        disabled={pathname.includes(routes.harian.href)}
      >
        <Link href={routes.harian.href}>
          <Calendar1Icon />
          <span className="text-xs">{routes.harian.label}</span>
        </Link>
      </Button>
      <Button
        asChild
        className={cn([
          "flex-row",
          `${pathname.includes(routes.misa.href) && "bg-blue-600"}`,
        ])}
        disabled={pathname.includes(routes.misa.href)}
      >
        <Link href={routes.misa.href}>
          <ChurchIcon />
          <span className="text-xs">{routes.misa.label}</span>
        </Link>
      </Button>
    </span>
  );
}
