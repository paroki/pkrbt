import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import LoginForm from "~/pkg/auth/components/LoginForm";
import {
  DEVELOPMENT,
  DIRECTUS_URL,
  PUBLIC_URL,
} from "~/services/config.server";

export function loader() {
  return json({
    directusUrl: `${DIRECTUS_URL}/auth/login/google?redirect=${PUBLIC_URL}/auth/directus`,
    development: DEVELOPMENT,
  });
}

export default function LoginPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <LoginForm directusUrl={data.directusUrl} development={data.development} />
  );
}
