import { signIn } from "@/common/auth";

export async function GET() {
  return await signIn("credentials");
}
