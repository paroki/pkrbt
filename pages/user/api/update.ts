import type { Route } from ".react-router/types/app/routes/+types/user.$id";
import service from "shared/service";
import invariant from "tiny-invariant";

export async function userUpdateLoader({ params, request }: Route.LoaderArgs) {
  invariant(params.id, "user update params id undefined");
  const user = await service.user.findByID(params.id, request.headers);

  return {
    user,
  };
}
