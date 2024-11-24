import { NavLink } from "@remix-run/react";
import Navigation from "./Navigation";
import { cn } from "~/common/utils";
import { UserContext } from "~/root";

export default function Header({ user }: { user: UserContext }) {
  const logo = {
    url: "/192x192.png",
    width: 192,
    height: 192,
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95",
        "backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border",
      )}
    >
      <div className="flex h-10 items-center px-4">
        <Navigation user={user} />
        <NavLink to="/" className="flex-row">
          <div className="flex flex-row gap-2 items-center justify-center hover:bg-slate-200 p-1">
            <img
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt="logo"
              style={{
                width: 32,
                height: 32,
                objectFit: "cover",
              }}
            />
            <h1 className="text-xl font-extrabold">PKRBT</h1>
          </div>
        </NavLink>
        <div className="flex-grow"></div>
      </div>
    </header>
  );
}
