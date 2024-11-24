import { defer, json } from "@remix-pwa/sw";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { ensureUserPolicy } from "~/pkg/auth/auth.server";
import MisaList from "~/pkg/pendapatan/components/MisaList";
import MisaSkeleton from "~/pkg/pendapatan/components/MisaSkeleton";
import { listByMisa } from "~/pkg/pendapatan/pendapatan.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureUserPolicy(request, "PengurusHarian");
  const { searchParams } = new URL(request.url);

  if (searchParams.has("mode")) {
    const pendapatan = await listByMisa(request);
    return json({ pendapatan });
  }

  const pendapatan = listByMisa(request);
  return defer({ pendapatan });
}

export default function Page() {
  const { pendapatan } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<MisaSkeleton />}>
      <Await resolve={pendapatan}>
        {(pendapatan) => <MisaList items={pendapatan} />}
      </Await>
    </Suspense>
  );
}
