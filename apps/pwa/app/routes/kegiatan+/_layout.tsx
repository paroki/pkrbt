import Container from "~/components/layout/Container";
import RootContextOutlet from "~/components/RootContextOutlet";
import { Separator } from "~/components/shadcn/separator";

export default function Layout() {
  return (
    <Container>
      <div className="flex flex-row">
        <h1 className="text-xl font-bold">Kegiatan</h1>
      </div>
      <Separator className="mb-2" />
      <RootContextOutlet />
    </Container>
  );
}
