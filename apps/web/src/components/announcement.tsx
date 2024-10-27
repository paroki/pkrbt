import Link from "next/link";
import { Text } from "@radix-ui/themes";
import LinkBtn from "./common/link";

type Announce = {
  title: string;
  path: string;
  date: string;
};

export default function Announcement() {
  const announces: Announce[] = [
    {
      title: "Pemberkasan utama sedikit lebih panjang",
      path: "#",
      date: "20 November 2024",
    },
    {
      title: "Pelaporan tugas utama",
      path: "#",
      date: "21 November 2024",
    },
    {
      title: "Pekerjaan utama",
      path: "#",
      date: "23 November 2024",
    },
  ];

  return (
    <div>
      <ul>
        {announces.map((ann, index) => (
          <li key={index} className="border-b py-2 my-4">
            <Link className="block font-semibold text-base" href={ann.path}>
              {ann.title}
            </Link>
            <Text as="span" className="text-sm">
              {ann.date}
            </Text>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <LinkBtn name="Selengkapnya" path="#" />
      </div>
    </div>
  );
}
