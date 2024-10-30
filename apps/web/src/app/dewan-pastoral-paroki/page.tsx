import Container from '@/components/ui/container';
import { generateMeta } from '@/utils/meta';
import { Metadata } from 'next';
import { directus } from '@/utils/directus';
import Image from 'next/image';
import DirectusImage from '@/components/common/image';
import { DM_Serif_Text } from 'next/font/google';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await generateMeta({
    title: 'Dewan Pastoral Paroki',
    description: 'Dewan Pastoral Paroki Paroki Kristus Raja Barong Tongkok, Keuskupan Agung Samarinda',
    type: 'article'
  });
}

const customFont = DM_Serif_Text({
  subsets: ['latin'],
  weight: '400'
});
export default async function Page() {
  const { items, error } = await directus.organisasi.jabatan.search({
    filter: {
      struktur: {
        sort: 1100
      }
    },
    fields: [
      '*',
      {
        penjabat: ['gelarDepan', 'nama', 'gelarBelakang', { foto: ['id', 'title', 'width', 'height', 'description'] }]
      }
    ]
  });

  if (!items) {
    return <h1>Data Tidak Ditemukan!</h1>;
  }

  if (error) {
    throw new Error('Terjadi kesalahan', { cause: error });
  }

  return (
    <Container>
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col w-full mb-4 text-center">
          <span className="block font-bold text-lg lg:text-xl p-0 m-0 tracking-widest text-primary-600">
            PERIODE 2024-2027
          </span>
          <span className={`${customFont.className} font-extrabold text-4xl md:text-5xl p-0 m-0`}>
            Dewan Pastoral Paroki
          </span>
        </div>
        <div className="flex flex-col w-full mb-8 text-center">
          <span className="text-2xl md:text-3xl p-0 m-0 ">Pengurus Harian</span>
        </div>
        <div className="grid gap-4 items-start sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              {item?.penjabat.foto ? (
                <DirectusImage
                  image={item.penjabat.foto}
                  style={{
                    height: 300,
                    width: 200,
                    objectFit: 'cover'
                  }}
                  className="rounded-lg overflow-hidden"
                />
              ) : (
                <Image
                  src="/static/unknown-person.jpg"
                  width={256}
                  height={283}
                  alt={`foto dari ${item.nama}`}
                  style={{
                    height: 300,
                    width: 200,
                    objectFit: 'cover'
                  }}
                  className="rounded-lg"
                />
              )}

              <div className="my-2 flex flex-col items-center w-full text-center">
                <span className="lg:text-xl font-bold text-primary-600">
                  {item?.penjabat.gelarDepan ? `${item.penjabat.gelarDepan} ` : ''}
                  {item?.penjabat.nama}
                  {item?.penjabat.gelarBelakang ? `, ${item.penjabat.gelarBelakang}` : ''}
                </span>
                <span className="lg:text-lg">{item.nama}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
