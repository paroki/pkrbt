import { OrganisasiR, UserR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Separator } from "~/components/shadcn/separator";
import { fetchLists } from "~/pkg/organisasi/actions.server";
import { getUserProfile, updateBiodata } from "~/pkg/user/actions.server";
import AvatarFoto from "~/pkg/user/components/AvatarFoto";
import BiodataForm from "~/pkg/user/components/BiodataForm";
import BiodataSkeleton from "~/pkg/user/components/BiodataSkeleton";

export async function action({ request }: ActionFunctionArgs) {
  return await updateBiodata(request);
}

async function biodataLoader(request: Request) {
  const profil = await getUserProfile(request);
  const organisasi = await fetchLists(request);
  return { profil, organisasi };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const result = biodataLoader(request);
  return defer({ result });
}

type Loader = {
  result: {
    profil: UserR;
    organisasi: OrganisasiR[];
  };
};

export default function UserBiodata() {
  const { result } = useLoaderData<Loader>();

  return (
    <Card className="min-w-full min-h-[400px]">
      <CardHeader>
        <CardTitle>Biodata</CardTitle>
        <CardDescription>Biodata Pengguna</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="mt-0">
        <Suspense fallback={<BiodataSkeleton />}>
          <Await resolve={result}>
            {(result) => (
              <div className="flex flex-wrap gap-x-8 gap-y-8">
                <div className="flex items-start">
                  <AvatarFoto />
                </div>
                <div className="flex">
                  <BiodataForm
                    profil={result.profil}
                    organisasiList={result.organisasi}
                  />
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </CardContent>
    </Card>
  );
}
