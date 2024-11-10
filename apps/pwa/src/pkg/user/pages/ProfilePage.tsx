"use server";

import { getCurrentUser } from "@/common/user";
import { notFound, redirect } from "next/navigation";
import ProfileForm from "@/pkg/user/components/ProfileForm";
import DefaultLayout from "@/ui/layout/default";
import { UserR } from "../types";
import { listOrganisasi } from "@/pkg/organisasi/actions";
import { getUserProfile } from "../actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  const me = await getCurrentUser();
  const user = await getUserProfile(params.id);
  const organisasi = await listOrganisasi();

  if (!user) {
    return notFound;
  }

  if (user.id != me.id) {
    redirect("/forbidden");
  }

  return (
    <DefaultLayout>
      <div className="py-8">
        {user && <ProfileForm organisasi={organisasi} user={user as UserR} />}
      </div>
    </DefaultLayout>
  );
}
