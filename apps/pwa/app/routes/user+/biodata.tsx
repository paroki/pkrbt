import { OrganisasiR, UserR } from "@pkrbt/directus";
import { defer } from "@remix-pwa/sw";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Container from "~/components/layout/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/shadcn/card";
import { Separator } from "~/components/shadcn/separator";
import { listOrganisasi } from "~/pkg/organisasi/actions.server";
import { getUserProfile, updateBiodata } from "~/pkg/user/users.server";
import AvatarFoto from "~/pkg/user/components/AvatarFoto";
import BiodataForm from "~/pkg/user/components/BiodataForm";
import BiodataSkeleton from "~/pkg/user/components/BiodataSkeleton";

export async function action({ request }: ActionFunctionArgs) {
  return await updateBiodata(request);
}

async function biodataLoader(request: Request) {
  const profil = await getUserProfile(request);
  const organisasi = await listOrganisasi(request);
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
    <Container className="md:w-fit lg:w-fit">
      <Card>
        <CardHeader>
          <CardTitle>Biodata</CardTitle>
          <CardDescription>Biodata Pengguna</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <Suspense fallback={<BiodataSkeleton />}>
            <Await resolve={result}>
              {(result) => (
                <div className="flex flex-wrap items-start justify-center gap-8">
                  <div className="flex items-start">
                    <div className="flex flex-row w-full items-center justify-center">
                      <AvatarFoto />
                    </div>
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
    </Container>
  );
}
