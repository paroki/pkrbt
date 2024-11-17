import { json } from "@remix-pwa/sw";
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator, getAuthenticatedUser } from "~/services/auth.server";
import createDirectus from "~/services/directus.server";
import { commitSession, getSession } from "~/services/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const directus = await createDirectus(request);
  const intent: "avatar" | "foto" = data.intent;

  const userId = data.userId as string;
  const fileId = data.fileId as string;
  const payload = intent === "avatar" ? { avatar: fileId } : { foto: fileId };
  const { item } = await directus.user.update(userId, payload, {
    fields: [
      "*",
      { avatar: ["id", "title", "description", "width", "height"] },
      { foto: ["id", "title", "description", "width", "height"] },
    ],
  });
  const user = item;

  const session = await getSession(request.headers.get("cookie"));
  const authUser = await getAuthenticatedUser(request);

  if (user) {
    session.set(authenticator.sessionKey, {
      ...authUser,
      profile: {
        nama: authUser.profile.nama,
        avatar: user.avatar,
        foto: user.foto,
      },
    });
  }

  return json(
    { user },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}
