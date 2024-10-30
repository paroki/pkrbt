import { redirect } from "next/navigation";
import ProfileForm from "../components/profile";
import { User } from "@pkrbt/directus";
import { auth } from "@/common/auth";

export default async function ProfilePage({}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div>
      <ProfileForm user={session.user as User} />
    </div>
  );
}
