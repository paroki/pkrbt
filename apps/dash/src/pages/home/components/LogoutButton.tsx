"use client";
import { Button } from "@/shared/shadcn/components/button";

export default function LogoutButton() {
  async function logout() {}
  return <Button onClick={logout}>Logout</Button>;
}
