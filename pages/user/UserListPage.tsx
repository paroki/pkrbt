import type { Route } from ".react-router/types/app/routes/+types/user._index";
import UserList from "./ui/UserList";

export function UserListPage({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
