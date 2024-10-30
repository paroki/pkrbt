import { DEVELOPMENT, DIRECTUS_URL, PUBLIC_URL } from "@/common/config";
import Link from "next/link";
import LoginForm from "./form";

export default function SignInForm({}) {
  const url = `${DIRECTUS_URL}/auth/login/google?redirect=${PUBLIC_URL}/api/auth/directus`;
  return (
    <div>
      <h1>Login</h1>
      <p>
        Gunakan email google yang anda gunakan di ponsel android/iphone anda.
      </p>

      {/* only show form on development env */}
      {DEVELOPMENT && (
        <div>
          <LoginForm />
        </div>
      )}

      <div>
        <Link href={url}>Login dengan Google</Link>
      </div>
    </div>
  );
}
