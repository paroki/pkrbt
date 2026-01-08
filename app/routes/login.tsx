import { Button } from "~/components/ui/button";
import { signInWithGoogle } from "~/lib/auth.client";
import type { Route } from "./+types/login";
import { SessionContext, UserContext } from "~/context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PKRBT - Login" },
    { name: "description", content: "Login aplikasi PKRBT" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  context.set(UserContext, undefined);
  context.set(SessionContext, undefined);
}

export default function LoginRoute() {
  return (
    <div>
      <h1>Login to PKRBT</h1>
      <Button onClick={signInWithGoogle}>Google</Button>
    </div>
  );
}
