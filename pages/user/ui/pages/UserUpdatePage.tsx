import type { Route } from ".react-router/types/app/routes/+types/user.$id";
import UserForm from "../components/UserForm";

export function UserUpdatePage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div>
      <UserForm user={user} />
    </div>
  );
}
