import { auth } from "@/common/auth";
import DefaultLayout from "@/ui/layout/default";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pkrbt/ui/shadcn/tabs";
import { redirect } from "next/navigation";
import { Button } from "@pkrbt/ui/shadcn/button";

import { User2Icon } from "lucide-react";
import Link from "next/link";
import { userSignOut } from "@/pkg/user/actions";
import SignOutForm from "@/pkg/auth/components/sign-out";

export const feeds = [
  {
    content: {
      tanggal: "5",
      title: "Rapat Kerja",
      organisasi: "KOMSOS",
      agenda: "Rencana Kerja 2024-2027",
      jam: "19.00",
      tempat: "Pastoran PKRBT",
    },
  },
  {
    content: {
      tanggal: "8",
      title: "Rapat Pengurus Harian",
      organisasi: "DPP",
      agenda: "Progress Pembangunan Gereja Baru",
      tempat: "Pastoran PKRBT",
      jam: "19.30",
    },
  },
  {
    content: {
      tanggal: "9",
      title: "Latihan Rutin Futsal",
      organisasi: "OMK",
      jam: "19.00",
      tempat: "Lapangan Futsal Ombau",
    },
  },
  {
    content: {
      tanggal: "12",
      organisasi: "Ling. St. Yusuf Barong Sentrum",
      title: "Misa Syukur HUT Perkawinan",
      tempat: "Rumah Bapak Agustinus",
      jam: "19.30",
    },
  },
];

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  const doSignOut = async () => {
    await userSignOut();
  };

  return (
    <DefaultLayout>
      <div className="flex w-full">
        <Tabs defaultValue="layanan" className="w-full p-2">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="layanan">Layanan</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full h-full gap-4">
              {feeds.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row bg-white rounded-sm drop-shadow-md p-2 gap-4 content-center align-middle"
                >
                  <div
                    style={{ width: 72, height: 72 }}
                    className="items-center content-center align-middle border border-slate-400 p-2 rounded-sm bg-slate-300"
                  >
                    <span className="block items-center text-center text-xl">
                      {item.content.tanggal}
                    </span>
                    <span className="block text-xs">Nopember</span>
                  </div>
                  <div>
                    <div className="flex flex-row text-md font-bold">
                      <span>{item.content.organisasi}</span>
                    </div>
                    <div className="flex flex-row text-sm gap-2">
                      <span className="font-semibold">Kegiatan:</span>
                      <span>{item.content.title}</span>
                    </div>
                    {item.content.agenda && (
                      <div className="flex flex-row text-sm gap-2">
                        <span className="font-semibold">Agenda:</span>
                        <span>{item.content.agenda}</span>
                      </div>
                    )}
                    <div className="flex flex-row text-sm gap-2">
                      <span className="font-semibold">Jam:</span>
                      <span>{item.content.jam}</span>
                    </div>
                    <div className="flex flex-row text-sm gap-2">
                      <span className="font-semibold">Tempat:</span>
                      <span>{item.content.tempat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="layanan" className="grid">
            <Button asChild className="flex-col w-16 h-16">
              <Link href={`/user/${user.id}/profile`}>
                <User2Icon />
                <span>Profil</span>
              </Link>
            </Button>
            <Button asChild className="flex-col w-16 h-16" onClick={doSignOut}>
              <SignOutForm />
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
