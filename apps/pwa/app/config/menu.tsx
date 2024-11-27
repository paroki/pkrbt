import {
  BadgeDollarSignIcon,
  LucideCalendarDays,
  LucideLogOut,
  LucideUniversity,
  RefreshCcw,
  SquareUserIcon,
  Table2Icon,
  Users2Icon,
} from "lucide-react";
import { MenuType } from "~/components/types";

export const menu: MenuType[] = [
  {
    label: "Pendapatan",
    to: "/pendapatan/misa",
    icon: BadgeDollarSignIcon,
    policy: ["PengurusHarian", "Bendahara"],
    color: "red",
  },
  {
    label: "Biodata",
    to: "/user/biodata",
    icon: SquareUserIcon,
    color: "green",
  },
  {
    label: "Refresh",
    to: "/auth/directus",
    icon: RefreshCcw,
    color: "orange",
  },
  {
    label: "Keluar",
    to: "/logout",
    icon: LucideLogOut,
    color: "green",
  },
  {
    label: "Kegiatan",
    to: "/kegiatan",
    icon: LucideCalendarDays,
    role: "organisator",
    color: "blue",
  },
  {
    label: "Organisasi",
    to: "/under-construction",
    icon: LucideUniversity,
    color: "blue",
    role: "organisator",
  },
  {
    label: "User",
    to: "/admin/users",
    icon: Users2Icon,
    color: "orange",
    role: "admin",
  },
  {
    label: "Referensi",
    to: "/referensi",
    icon: Table2Icon,
    color: "blue",
    role: "admin",
  },
];
