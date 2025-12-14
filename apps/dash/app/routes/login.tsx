import Container from "~/components/layouts/Container";
import Login from "~/pkg/user/Login";

export default function LoginPage() {
  return (
    <Container className="flex items-center place-content-center">
      <Login />
    </Container>
  );
}
