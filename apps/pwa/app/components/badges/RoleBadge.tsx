import { ComponentPropsWithRef } from "react";
import { Badge } from "../shadcn/badge";
import { UserR } from "@pkrbt/directus";

type Props = ComponentPropsWithRef<typeof Badge> & {
  user?: UserR;
};

export default function RoleBadge({ user, ...props }: Props) {
  if (!user) return null;
  return <Badge {...props}>{user.role?.name}</Badge>;
}
