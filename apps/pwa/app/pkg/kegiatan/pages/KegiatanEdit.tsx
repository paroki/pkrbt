import { useLoaderData } from "@remix-run/react";
import KegiatanForm from "../components/KegiatanForm";
import { loader } from "~/routes/kegiatan+/$id";
import { Tabs, TabsList, TabsTrigger } from "~/components/shadcn/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Separator } from "~/components/shadcn/separator";
import { cn } from "~/common/utils";
import { FileIcon, Image, LucideFormInput, LucideImage } from "lucide-react";
import CoverUpload from "../components/CoverUpload";

const tabs = [
  { value: "detail", title: "Detail", icon: LucideFormInput },
  { value: "cover", title: "Cover", icon: LucideImage },
  { value: "foto", title: "Foto", icon: Image },
  { value: "dokumen", title: "Dokumen", icon: FileIcon },
];
export default function KegiatanEdit() {
  const { kegiatan } = useLoaderData<typeof loader>();
  const [active, setActive] = useState("detail");

  return (
    <Tabs defaultValue="detail" onValueChange={setActive}>
      <TabsList className="gap-x-2 grow-basis-1">
        {tabs.map((item, index) => (
          <TabsTrigger
            key={`tabs-${index}`}
            value={item.value}
            className={cn(
              "flex flex-row space-x-2 grow basis-1",
              "rounded-none rounded-t-md",
              "items-center justify-center",
              active === item.value && "border-b-red-600 border-b-4",
            )}
          >
            <item.icon />
            <span>{item.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <Separator className="mb-2" />
      <TabsContent value="detail">
        <KegiatanForm kegiatan={kegiatan} />
      </TabsContent>
      <TabsContent value="cover">
        <CoverUpload kegiatan={kegiatan} />
      </TabsContent>
      <TabsContent value="foto">Foto</TabsContent>
      <TabsContent value="dokumen">Dokumen</TabsContent>
    </Tabs>
  );
}
