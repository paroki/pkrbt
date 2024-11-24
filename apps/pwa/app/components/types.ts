import { SquareUserIcon } from "lucide-react";
import { UserPolicyType, UserRole } from "~/pkg/auth/types";

export type colors = "red" | "green" | "blue" | "orange";
export type MenuType = {
  label: string;
  to: string;
  icon: typeof SquareUserIcon;
  color: colors;
  role?: UserRole;
  policy?: UserPolicyType | UserPolicyType[];
};

export type PropsWithAuth = {
  role?: UserRole;
  policy?: UserPolicyType | UserPolicyType[];
};
