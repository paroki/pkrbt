import {
  BadgeDollarSignIcon,
  LucideCalendarDays,
  LucideLogOut,
  LucideUniversity,
  SquareUserIcon,
  Users2Icon,
} from "lucide-react";
import { MenuType } from "~/components/types";

export const menu: MenuType[] = [
  {
    label: "Biodata",
    to: "/user/biodata",
    icon: SquareUserIcon,
    color: "green",
  },
  {
    label: "Kegiatan",
    to: "/kegiatan",
    icon: LucideCalendarDays,
    color: "blue",
  },
  {
    label: "Pendapatan",
    to: "/pendapatan/misa",
    icon: BadgeDollarSignIcon,
    policy: ["PengurusHarian", "Bendahara"],
    color: "red",
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
    label: "Keluar",
    to: "/logout",
    icon: LucideLogOut,
    color: "green",
  },
];
