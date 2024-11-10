import { auth } from "@/common/auth";
import SignInForm from "@/pkg/auth/components/sign-in";
import { redirect } from "next/navigation";

export default async function LoginPage({}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
