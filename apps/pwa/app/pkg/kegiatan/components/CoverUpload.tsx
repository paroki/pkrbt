import { uploadFiles } from "@directus/sdk";
import { KegiatanR } from "@pkrbt/directus";
import { Image, LucideLoader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Button } from "~/components/shadcn/button";
import { Input } from "~/components/shadcn/input";
import { Label } from "~/components/shadcn/label";
import { useDirectus } from "~/hooks/directus";
import Resizer from "react-image-file-resizer";
import { useStorage } from "~/pkg/storage/hooks";

export default function CoverUpload({ kegiatan }: { kegiatan: KegiatanR }) {
  const { assetUrl } = useStorage();
  const initial = kegiatan.cover ? assetUrl(kegiatan.cover.id) : undefined;
  const directus = useDirectus();

  const [cover, setCover] = useState(initial);
  const [loading, setLoading] = useState(false);

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1980,
        1080,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setLoading(true);
    const file = e.target.files[0];
    const resized = (await resizeFile(file)) as string;
    const r = await fetch(resized);
    const resizedData = await r.blob();

    const data = new FormData();
    data.append("title", `${kegiatan.namaKegiatan} cover`);
    data.append("file", resizedData, `${kegiatan.cover}-cover.jpeg`);

    const response = await directus.rest.request(uploadFiles(data));
    await directus.kegiatan.update(kegiatan.id, {
      cover: response.id,
    });

    setCover(resized);
    setLoading(false);
  }
  return (
    <div className="flex flex-col max-w-sm">
      <h1 className="text-2xl">Cover Kegiatan</h1>
      <div className="flex flex-row pt-4">
        {cover && <img src={cover} alt="@testing" />}
      </div>
      <div className="flex flex-row">
        <Button asChild size={"sm"}>
          <Label htmlFor="uploadFoto" style={{ whiteSpace: "nowrap" }}>
            {loading ? (
              <LucideLoader2 className="animate-spin" />
            ) : (
              <Image className="flex h-6 w-6" />
            )}
            Ganti Cover
            <Input
              id="uploadFoto"
              type="file"
              name="foto"
              style={{ visibility: "hidden", display: "none" }}
              hidden={true}
              onChange={async (e) => await handleChange(e)}
            />
          </Label>
        </Button>
      </div>
    </div>
  );
}
