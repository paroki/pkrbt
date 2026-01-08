import type { User } from "better-auth";
import type { PropsWithChildren } from "react";
import { Link } from "react-router";

export default function DefaultLayout({
  children,
  user,
}: { user: User } & PropsWithChildren) {
  return (
    <>
      <header>
        <ul className="flex flex-row *:bg-amber-200 space-x-2 *:p-2">
          <li>
            <Link to="/">Beranda</Link>
          </li>
          <li className="left-0">{user.name}</li>
        </ul>
      </header>

      <main>{children}</main>
    </>
  );
}
