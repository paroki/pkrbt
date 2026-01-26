import Container from "@/shared/ui/layout/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
  description: "Beranda",
};

export async function HomePage() {
  return (
    <Container title="Beranda">
      <h1 className="text-2xl font-bold space-y-4">Hello World</h1>
    </Container>
  );
}
