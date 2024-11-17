import { json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import DefaultLayout from "~/components/layout/Default";
import { RootOutletContext, UserContext } from "~/root";
import {
  AuthenticatedUser,
  getAuthenticatedUser,
} from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthenticatedUser(request);
  return json({ user });
}

export default function User() {
  const context = useOutletContext<RootOutletContext>();
  const { user } = useLoaderData<typeof loader>();
  const { id, profile, policies } = user as AuthenticatedUser;
  const { nama, avatar, foto } = profile;
  const userContext: UserContext = {
    id,
    nama,
    avatar,
    foto,
    policies,
  };
  return (
    <DefaultLayout>
      <Outlet
        context={{ ...context, user: userContext } satisfies RootOutletContext}
      />
    </DefaultLayout>
  );
}
