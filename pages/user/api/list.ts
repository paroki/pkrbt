import type { Route } from ".react-router/types/app/routes/+types/user._index";
import service from "shared/service";

export async function userListLoader({ request }: Route.LoaderArgs) {
  const { users, total } = await service.user.list({}, request.headers);
  return {
    users,
    total,
  };
}
