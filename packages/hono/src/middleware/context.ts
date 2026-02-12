import auth from "@pkrbt/better-auth";
import type { Context as CoreContext } from "@pkrbt/core";
import { ContextStorage } from "@pkrbt/core";
import type { Context, Next } from "hono";

export async function coreContext(c: Context, next: Next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return await next()
  }

  const ctx: CoreContext = {
    user: session.user,
    session: session.session,
  };
  await ContextStorage.run(ctx, async () => {
    await next();
  });
}
