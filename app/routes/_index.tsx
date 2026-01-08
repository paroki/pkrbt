import UnderConstruction from "~/components/UnderConstruction";
import type { Route } from "./+types/_index";
import { SessionContext, UserContext } from "~/context";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth.client";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Beranda" }, { name: "description", content: "Beranda" }];
}

export async function loader({ context }: Route.LoaderArgs) {
  return {
    user: context.get(UserContext),
    session: context.get(SessionContext),
  };
}

export default function Home() {
  const navigate = useNavigate();
  const doSignOut = async () => {
    await authClient.signOut();
    navigate("/login");
  };
  return (
    <div>
      <ul className="list-disc list-inside">
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/pendapatan">Pendapatan</Link>
        </li>
        <li>
          <Button onClick={doSignOut}>Keluar</Button>
        </li>
      </ul>
    </div>
  );
}
