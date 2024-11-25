import { UserR, UserRoleR } from "@pkrbt/directus";
import { useFetcher } from "@remix-run/react";
import { LoaderCircleIcon, UserCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/shadcn/dropdown-menu";

export default function RoleDropdown({
  roles,
  user,
}: {
  roles: UserRoleR[];
  user: UserR;
}) {
  const [items, setItems] = useState(roles);
  const [submitting, setSubmitting] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    setItems(roles);
  }, [roles]);

  useEffect(() => {
    if (fetcher.state === "idle" && submitting) {
      setSubmitting(false);
    }
  }, [fetcher.state, submitting]);

  function updateRole(roleId: string) {
    setSubmitting(true);
    fetcher.submit(
      {
        intent: "update-role",
        payload: {
          roleId: roleId,
          userId: user.id,
        },
      },
      {
        method: "POST",
        encType: "application/json",
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} className="bg-green-600 hover:bg-green-700/90">
          {submitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <UserCircle2Icon />
          )}
          Ganti Role
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={user.role?.id}
          onValueChange={(value) => updateRole(value)}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem
              key={`role-${user.id}-${item.id}`}
              value={item.id}
            >
              {item.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
