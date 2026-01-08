import { authClient } from "~/lib/auth.client";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function UnderConstruction({ feature }: { feature?: string }) {
  const navigate = useNavigate();
  const doSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await navigate("/login");
        },
      },
    });
  };
  return (
    <div>
      <h1>Under Construction</h1>
      <p>
        Fitur {feature ?? "Under Construction"} ini masih dalam tahap
        pengembangan
      </p>
      <Button onClick={doSignOut}>Keluar</Button>
    </div>
  );
}
