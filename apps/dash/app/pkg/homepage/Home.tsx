import { useNavigate } from "react-router";
import { signOut } from "~/lib/auth.client";
import { Button } from "~/components/ui/button";

type Props = {
  user: any;
};
export default function Home({ user }: Props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login");
        },
      },
    });
  };

  // const { data } = useSession();
  return (
    <div>
      <h1>Selamat datang kak {user.name}</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
