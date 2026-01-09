import { HomeIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import type { IconType } from "./types";

export type TopNavBarMenu = {
  icon: IconType;
  url: string;
  label?: string;
};

type Props = {
  menus: TopNavBarMenu[];
};

export function TopNavBar({ menus = [] }: Props) {
  return (
    <div className="w-full">
      <ButtonGroup className="h-fit">
        <Button
          asChild
          variant={"outline"}
        >
          <Link to={"/"}>
            <HomeIcon />
          </Link>
        </Button>
        {menus.map((menu, ix) => (
          <Button
            asChild
            variant={"outline"}
            key={ix}
          >
            <Link to={menu.url}>
              <menu.icon />
              {menu.label}
            </Link>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
