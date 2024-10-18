import { Navigation } from "@/components/layouts/navigation";

// A server component need to be separated from client component.
// So we pass a value we get from the server by using the props to client

export default async function NavigationServer() {
  return <Navigation />;
}
