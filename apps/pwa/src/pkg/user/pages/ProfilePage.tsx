import { createDirectus } from "@/common/directus";
import { getCurrentUser } from "@/common/user";
import { notFound } from "next/navigation";
import ProfileForm from "@/pkg/user/components/ProfileForm";
import DefaultLayout from "@/ui/layout/default";
import { UserR } from "../types";

type Props = {
  params: {
    id: string;
  };
};

export async function getUser(id: string) {
  const currentUser = await getCurrentUser();

  if (currentUser.id == id) {
    return { item: currentUser, error: undefined };
  }

  const directus = await createDirectus();
  return await directus.user.read(id, {
    fields: ["*", { role: ["id", "name"] }],
  });
}

export default async function ProfilePage({ params }: Props) {
  const me = await getCurrentUser();
  const { item: user, error } = await getUser(params.id);

  if (!user) {
    return notFound;
  }

  if (error) {
    throw new Error("Error", { cause: error });
  }

  if (me.role.name !== "Administrator" && user.id != me.id) {
    throw new Error("Forbidden Access");
  }

  return (
    <DefaultLayout>
      <div className="py-8">
        <ProfileForm user={user as UserR} />
      </div>
    </DefaultLayout>
  );
}
