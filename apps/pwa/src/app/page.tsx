import { auth } from "@/common/auth";
import Link from "next/link";
import SignOutForm from "./login/components/sign-out";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Hello World</h1>
      <div>Layout Page</div>
      {session && session.user ? (
        <SignOutForm />
      ) : (
        <Link href="/login">Login</Link>
      )}
      <Link href={`/user/${session?.user?.id}/profile`}>Profil</Link>
    </div>
  );
}
