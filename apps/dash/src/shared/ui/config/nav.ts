import { BadgeDollarSign, Home } from "lucide-react";
import { Nav } from "@/shared/ui";

export const NavMenu: Nav[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Pendapatan",
    url: "/pendapatan",
    icon: BadgeDollarSign,
  },
];
