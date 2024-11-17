import { DollarSignIcon, User2Icon } from "lucide-react";
import { Menu } from "~/common/types";

export const mainMenu: Menu[] = [
  {
    label: "Pendapatan",
    route: "/pendapatan",
    icon: <DollarSignIcon />,
  },
  {
    label: "Profil",
    route: "/profil",
    icon: <User2Icon />,
  },
];
