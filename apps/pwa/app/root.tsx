import {
  ClientLoaderFunctionArgs,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { json, useSWEffect } from "@remix-pwa/sw";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import styles from "./tailwind.css?url";
import { verifyUser } from "./services/auth.server";
import { Toaster } from "./components/shadcn/toaster";
import { Dispatch, SetStateAction, useState } from "react";
import { ImageType } from "@pkrbt/directus";
import { DIRECTUS_URL } from "./services/config.server";
import ErrorLayout from "./components/layout/error";
import DefaultLayout from "./components/layout/DefaultLayout";
import localforage from "localforage";
import Forbidden from "./components/page/Forbidden";
import { UserPolicy, UserRole } from "./pkg/auth/types";

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
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
      </head>
      <body>
        <div>
          <div className="relative flex min-h-screen flex-col bg-slate-100">
            {children}
          </div>
        </div>
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
  let h: Headers | undefined;

  if (!location.includes("login")) {
    const { authUser, headers } = await verifyUser(request);
    const { nama, avatar, foto } = authUser.profile;
    const { id, policies, token, role } = authUser;
    h = headers;
    directusToken = token;
    user = {
      id,
      nama,
      avatar,
      foto,
      policies,
      role,
    };
  }

  return json(
    {
      user,
      directusUrl: DIRECTUS_URL,
      directusToken,
    },
    { headers: h ? h : {} },
  );
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const serverData = await serverLoader<typeof loader>();
  const permissions = serverData.permissions;
  await localforage.setItem("permissions", permissions);

  return {
    ...serverData,
  };
}

export type UserContext = {
  id: string;
  nama: string;
  avatar?: ImageType;
  foto?: ImageType;
  policies: UserPolicy[];
  role: UserRole;
};

export type RootOutletContext = {
  user: UserContext;
  setUser: Dispatch<SetStateAction<UserContext | undefined>>;
  directusUrl: string;
  directusToken: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function App() {
  useSWEffect();
  const {
    user: initialUser,
    directusUrl,
    directusToken,
  } = useLoaderData<typeof loader>();
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  if (!user || location.pathname.includes("/login")) {
    return <Outlet />;
  }

  return (
    <DefaultLayout user={user}>
      <Outlet
        context={
          {
            user,
            setUser,
            directusUrl,
            directusToken,
            loading,
            setLoading,
          } satisfies RootOutletContext
        }
      />
    </DefaultLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && 403 === error.status) {
    return <Forbidden />;
  }

  if (process.env.NODE_ENV === "development") throw error;

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorLayout
        title={`${error.status} - ${error.statusText}`}
        type="error"
      />
    );
  } else if (error instanceof Error) {
    return <ErrorLayout title="Error" type="error" />;
  } else {
    return <ErrorLayout title="Kutu Ditemukan!" type="bug" />;
  }
}
