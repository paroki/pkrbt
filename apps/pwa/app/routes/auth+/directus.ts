import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";
import { getSessionUser } from "~/services/user.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getSessionUser(request);
  if (!user) {
    redirect("/login");
  }

  const session = await getSession(request.headers.get("coookie"));
  session.set(authenticator.sessionKey, user);

  const headers = new Headers({
    "Set-Cookie": await commitSession(session),
  });

  return redirect("/", { headers });
}
