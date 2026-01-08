import type { Route } from ".react-router/types/app/routes/+types/user.$id";

export function UserUpdatePage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}
