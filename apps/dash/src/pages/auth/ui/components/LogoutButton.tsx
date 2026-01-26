"use client";
import { Button } from "@/shared/shadcn/components/button";

export default function LogoutButton({
  handler,
}: {
  handler: () => Promise<void>;
}) {
  return <Button onClick={handler}>Logout</Button>;
}
