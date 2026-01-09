import type { Route } from ".react-router/types/app/routes/+types/user._index";
import { service } from "services";
import type { UserSearch } from "shared/types";

export async function userListAction({ request }: Route.LoaderArgs) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return {
      users: [],
      total: 0,
    };
  }
  const query: UserSearch = await request.json();
  console.log(query);
  const { users: items, total } = await service.user.list(query);
  return {
    items,
    total,
  };
}
