import Container from "@/components/ui/container";
import { directus } from "@/utils/directus";
import ImamStacked from "./components/imam";

export default async function Page() {
  const { items: aktif } = await directus.imam.search({
    filter: {
      aktif: {
        _eq: true,
      },
    },
    fields: [
      "*",
      {
        riwayat: ["bertugasSebagai", "dimulaiPada", "berakhirPada"],
      },
      {
        foto: ["id", "title", "description", "width", "height"],
      },
    ],
    sort: ["riwayat"],
  });

  const { items } = await directus.imam.search({
    filter: {
      aktif: {
        _eq: false,
      },
    },
    fields: [
      "*",
      {
        riwayat: ["bertugasSebagai", "dimulaiPada", "berakhirPada"],
      },
      {
        foto: ["id", "title", "description", "width", "height"],
      },
    ],
    // @ts-expect-error 2322
    sort: ["riwayat.dimulaiPada"],
  });
  return (
    <Container>
      <div className="max-w-screen-md mx-auto">
        <div className="grid lg:grid-cols-2 justify-evenly">
          {aktif &&
            aktif.map((imam, index) => <ImamStacked key={index} imam={imam} />)}
        </div>
        <div className="flex flex-col w-full mb-8 text-center">
          <span className="text-2xl md:text-3xl p-0 m-0 my-12">
            Pernah Melayani
          </span>
          <div className="grid lg:grid-cols-3 justify-evenly align-top gap-4">
            {items &&
              items.map((imam, index) => (
                <ImamStacked key={index} imam={imam} />
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
