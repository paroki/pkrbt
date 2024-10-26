import Container from "@/components/ui/container";
import { generateMeta } from "@/utils/meta";
import { Metadata } from "next";
import { directus } from "@/utils/directus";
import Image from "next/image";
import DirectusImage from "@/components/common/image";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await generateMeta({
    title: "Dewan Pastoral Paroki",
    description:
      "Dewan Pastoral Paroki Paroki Kristus Raja Barong Tongkok, Keuskupan Agung Samarinda",
    type: "article",
  });
}

export default async function Page() {
  const { items, error } = await directus.organisasi.jabatan.search({
    filter: {
      struktur: {
        sort: 1100,
      },
    },
    fields: [
      "*",
      { penjabat: ["gelarDepan", "nama", "gelarBelakang", "foto"] },
    ],
  });

  if (!items) {
    return <h1>Data Tidak Ditemukan!</h1>;
  }

  if (error) {
    throw new Error("Terjadi kesalahan", { cause: error });
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col w-full pb-8 text-center">
          <span className="block font-bold lg:text-xl p-0 m-0 tracking-widest text-primary-600">
            PERIODE 2024-2027
          </span>
          <span className="font-extrabold md:text-4xl p-0 m-0 uppercase">
            Dewan Pastoral Paroki
          </span>
        </div>
        <div className="flex flex-col w-full pb-8 text-center underline">
          <span className="font-extrabold md:text-3xl p-0 m-0 uppercase">
            Pengurus Harian
          </span>
        </div>
        <div className="grid gap-12 items-start sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              {item?.penjabat.foto ? (
                <DirectusImage
                  image={item.penjabat.foto}
                  style={{
                    height: 240,
                    width: 200,
                    objectFit: "cover",
                  }}
                  className="rounded-lg w-full overflow-hidden"
                />
              ) : (
                <Image
                  src="/static/unknown-person.jpg"
                  width={256}
                  height={283}
                  alt={`foto dari ${item.nama}`}
                  style={{
                    height: 240,
                    width: 200,
                    objectFit: "cover",
                  }}
                />
              )}

              <div className="my-2 flex flex-col items-center w-full lg:text-center">
                <span className="lg:text-2xl font-bold text-primary-600">
                  {item?.penjabat.nama}
                </span>
                <span className="lg:text-1xl font-semibold">{item.nama}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
