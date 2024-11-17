import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { json, ManifestLink } from "@remix-pwa/sw";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import styles from "./tailwind.css?url";
import { AuthenticatedUser, authenticator } from "./services/auth.server";
import { Toaster } from "./components/shadcn/toaster";
import { Dispatch, SetStateAction, useState } from "react";
import { ImageType } from "@pkrbt/directus";
import { DIRECTUS_URL, policies } from "./services/config.server";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id-ID">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <ManifestLink />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const location = request.url;
  let user: UserContext | undefined;
  let directusToken = "";

  if (!location.includes("login")) {
    const authUser = (await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    })) as AuthenticatedUser;
    const { nama, avatar, foto } = authUser.profile;
    const { id, policies, token } = authUser;
    directusToken = token;
    user = {
      id,
      nama,
      avatar,
      foto,
      policies,
    };
  }

  const userPolicies: UserPolicies = policies;

  return json({ user, directusUrl: DIRECTUS_URL, directusToken, userPolicies });
}

export type UserContext = {
  id: string;
  nama: string;
  avatar?: ImageType;
  foto?: ImageType;
  policies: string[];
};

export type UserPolicies = {
  administrator: string;
  bendaharaDPP: string;
  pengurusHarianDPP: string;
};

export type RootOutletContext = {
  user: UserContext;
  setUser: Dispatch<SetStateAction<UserContext>>;
  directusUrl: string;
  directusToken: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userPolicies: UserPolicies;
};

export default function App() {
  const {
    user: initialUser,
    directusUrl,
    directusToken,
    userPolicies,
  } = useLoaderData<typeof loader>();
  const [user, setUser] = useState(initialUser as UserContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  if (!user || location.pathname.includes("/login")) {
    return <Outlet />;
  }

  return (
    <Outlet
      context={
        {
          user,
          setUser,
          directusUrl,
          directusToken,
          loading,
          setLoading,
          userPolicies,
        } satisfies RootOutletContext
      }
    />
  );
}
