import { updateUser } from "@directus/sdk";
import { UserR } from "@pkrbt/directus";
import { defer, json } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/layout/Container";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import AdminUserList from "~/pkg/user/components/AdminUserList";
import { listUsers } from "~/pkg/user/users.server";
import { sdkCreateClient } from "~/services/directus.server";

export async function action({ request }: ActionFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  const directus = await sdkCreateClient(request);
  const { intent, payload } = await request.json();
  let user: UserR | undefined = undefined;

  if ("update-role" === intent) {
    const { roleId, userId } = payload;
    user = (await directus.request(
      updateUser(userId, { role: roleId }, { fields: ["id"] }),
    )) as unknown as UserR;
  }

  if ("update-policies" === intent) {
    const { userId, policies } = payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pols: any[] = [];
    const items: string[] = policies as string[];
    items.map((item) => {
      pols.push({
        policy: { id: item },
      });
    });
    user = (await directus.request(
      updateUser(
        userId,
        {
          policies: pols,
        },
        { fields: ["id"] },
      ),
    )) as unknown as UserR;
  }

  return json({ user });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  const users = listUsers(request);
  return defer({ users });
}

export default function Page() {
  const { users } = useLoaderData<{ users: Promise<UserR[]> }>();
  return (
    <Container>
      <AdminUserList users={users} />
    </Container>
  );
}
