import { Link } from "@remix-run/react";
import { Button } from "../shadcn/button";
import {
  LucidePencil,
  LucidePlus,
  LucideTrash,
  LucideView,
} from "lucide-react";
import { ComponentPropsWithRef } from "react";
import { PropsWithAuth } from "../types";
import { useAuth } from "~/pkg/auth/hooks";

const iconStyles = {
  add: LucidePlus,
  edit: LucidePencil,
  delete: LucideTrash,
  detail: LucideView,
};

type variant = "add" | "edit" | "delete" | "detail";

type Props = ComponentPropsWithRef<typeof Button> &
  PropsWithAuth & {
    iconStyle: variant;
    actionUrl: string;
  };

export default function IconButton({
  actionUrl,
  iconStyle,
  role,
  policy,
  ...props
}: Props) {
  const IconItem = iconStyles[iconStyle];
  const { ensureGranted } = useAuth();
  const granted = ensureGranted(role, policy);
  if (!granted) {
    return null;
  }

  return (
    <Button {...props} asChild size={"icon"}>
      <Link to={actionUrl}>
        <IconItem />
      </Link>
    </Button>
  );
}
