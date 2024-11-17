import { useOutletContext } from "@remix-run/react";
import { RootOutletContext } from "~/root";
import AvatarFoto from "./AvatarFoto";

export default function AvatarForm() {
  const { user, setUser } = useOutletContext<RootOutletContext>();

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <AvatarFoto user={user} setUser={setUser} />
    </div>
  );
}
