import DirectusImage from "@/components/common/image";
import { cn } from "@/utils/css";
import { Imam } from "@pkrbt/directus";
import Image from "next/image";

type Props = {
  imam: Imam;
};

export default function ImamStacked({ imam }: Props) {
  const noPhoto = {
    url: "/static/unknown-person.jpg",
    width: 481,
    height: 640,
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {imam.foto ? (
        <DirectusImage
          image={imam.foto}
          sizes="(max-width: 24px) 100vw"
          style={{
            objectFit: "cover",
            width: 172,
            height: 230,
          }}
          className="rounded-lg overflow-hidden"
        />
      ) : (
        <Image
          src={noPhoto.url}
          width={noPhoto.width}
          height={noPhoto.height}
          alt={`foto dari ${imam.nama}`}
          style={{
            objectFit: "cover",
            width: 172,
            height: 230,
          }}
          className="rounded-lg"
        />
      )}
      <div className="my-2 flex flex-col items-center w-full text-center">
        <span className={cn(["lg:text-md font-bold", "text-primary-700"])}>
          {imam.imamDiosesan ? "RD." : "RP."} {imam.nama}{" "}
          {!imam.imamDiosesan && imam.tarekat}
        </span>
        <div className="flex flex-col">
          {imam.riwayat &&
            imam.riwayat.map((riwayat, index) => (
              <div key={index} className="flex text-sm">
                <span>
                  {riwayat.bertugasSebagai == "1"
                    ? "Pastor Kepala"
                    : "Pastor Rekan"}
                </span>
                :&nbsp;
                <span>
                  {riwayat.dimulaiPada?.substring(0, 4)}
                  {riwayat.berakhirPada &&
                    ` - ${riwayat.berakhirPada.substring(0, 4)}`}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
