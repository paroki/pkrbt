import Home from "~/pkg/homepage/Home";
import type { Route } from "./+types/home";
import { auth } from "~/lib/auth.server";
import { redirect } from "react-router";
import Container from "~/components/layouts/Container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.user) {
    return redirect("/login");
  }
  return { ...session };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <Container>
      <div className="flex items-center place-content-center">
        <Home user={user} />
      </div>
    </Container>
  );
}
