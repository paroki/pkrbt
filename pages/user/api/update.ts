import type { Route } from ".react-router/types/app/routes/+types/user.$id";
import { service } from "services";
import invariant from "tiny-invariant";
import { UserFormSchema } from "../schema";
import { z } from "shared/utils";
import type { User } from "shared/types";

export async function userUpdateLoader({ params, request }: Route.LoaderArgs) {
  invariant(params.id, "user update params id undefined");
  const user = await service.user.findByID(params.id, request.headers);

  return {
    user: user as unknown as User,
  };
}

export async function userUpdateAction({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const { success, data, error } = await z.safeParseAsync(
    UserFormSchema,
    Object.fromEntries(formData),
  );
  let user = await service.user.findByID(params.id, request.headers);

  // ensure data.role to be array
  if (data?.role) {
    data.role =
      typeof data.role === "string" ? data.role.split(",") : data?.role;
  }

  if (success) {
    user = await service.user.update(
      params.id,
      data as unknown as User,
      request.headers,
    );
    return {
      user,
    };
  }

  return {
    error,
  };
}
