import { signOut } from "@/common/auth";
import { DIRECTUS_TOKEN_NAME } from "@/common/config";
import { cookies } from "next/headers";

export default function SignOutForm({}) {
  return (
    <form
      action={async () => {
        "use server";
        const cookie = cookies();
        cookie.delete(DIRECTUS_TOKEN_NAME);
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
