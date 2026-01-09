import type { Route } from ".react-router/types/app/routes/+types/user._index";
import { UserTable } from "../components";

export function UserListPage() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
