import { LogInIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "~/lib/auth.client";

export default function LoginButton() {
  const handleLogin = () => {
    signIn.social({
      provider: "google",
    });
  };
  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      onClick={handleLogin}
    >
      <LogInIcon />
      Google
    </Button>
  );
}
