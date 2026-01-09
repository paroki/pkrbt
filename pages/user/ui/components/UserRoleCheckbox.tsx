import type { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

export function UserRoleCheckbox({
  value,
  onChange = (roles) => {},
}: {
  value: string | string[];
  onChange?: (roles: string[]) => void;
}) {
  const iRole = typeof value === "string" ? [value] : value;
  const [admin, setAdmin] = useState(iRole.includes("admin"));
  const [user, setUser] = useState(iRole.includes("user"));

  function handleCheckedChange(role: string, checked: CheckedState) {
    if (role === "admin") {
      setAdmin(!!checked);
    }
    if (role === "user") {
      setUser(!!checked);
    }
  }

  useEffect(() => {
    let roles = [];
    if (user) {
      roles.push("user");
    }
    if (admin) {
      roles.push("admin");
    }
    onChange(roles);
  }, [admin, user]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Checkbox
          id="user"
          name="user"
          value={"user"}
          onCheckedChange={(checked) => {
            handleCheckedChange("user", checked);
          }}
          checked={user}
        />
        <Label htmlFor="user">User</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="admin"
          name="admin"
          value={"admin"}
          onCheckedChange={(checked) => {
            handleCheckedChange("admin", checked);
          }}
          checked={admin}
        />
        <Label htmlFor="admin">Admin</Label>
      </div>
    </div>
  );
}
