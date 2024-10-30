import { auth } from "@/common/auth";
import { createDirectus } from "@/common/directus";
import { getCurrentUser } from "@/common/user";
import { readItem, readUser } from "@directus/sdk";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileForm from "@/user/components/ProfileForm";

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

  const directus = createDirectus();
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
    <div>
      <Link href="/">Homepage</Link>
      <ProfileForm user={user} />
    </div>
  );
}
