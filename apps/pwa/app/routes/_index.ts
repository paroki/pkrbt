import { redirect } from "@remix-pwa/sw";

export async function loader() {
  return redirect("/dashboard/agenda");
}
