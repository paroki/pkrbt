import { updateItem, uploadFiles } from "@directus/sdk";
import { KegiatanR } from "@pkrbt/directus";
import {
  LoaderCircleIcon,
  LucideImage,
  LucideImagePlus,
  LucideLoader2,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "~/components/shadcn/button";
import { Input } from "~/components/shadcn/input";
import { Label } from "~/components/shadcn/label";
import { useDirectus } from "~/hooks/directus";
import { useStorage } from "~/pkg/storage/hooks";
import GalleryInput from "~/pkg/storage/components/GalleryInput";
import { useNavigation } from "@remix-run/react";
import { resizeImage } from "~/pkg/storage/utils";

export default function CoverUpload({ kegiatan }: { kegiatan: KegiatanR }) {
  const { assetUrl } = useStorage();
  const initial = kegiatan.cover ? assetUrl(kegiatan.cover.id) : undefined;
  const directus = useDirectus();
  const [cover, setCover] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    if (navigate.state === "idle") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [navigate.state]);

  async function updateCover(coverId: string) {
    setLoading(true);
    await directus.request(
      updateItem("kegiatan", kegiatan.id, {
        cover: coverId,
      }),
    );
    setLoading(false);
    setCover(assetUrl(coverId));
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const resized = await resizeImage(file);
    const data = new FormData();

    let coverFolder = undefined;

    if (kegiatan.organisasi && kegiatan.organisasi.coverFolder) {
      coverFolder = kegiatan.organisasi.coverFolder as string;
    }

    if (coverFolder) {
      data.append("folder", coverFolder);
    }
    data.append("title", `${kegiatan.namaKegiatan} cover`);
    data.append("file", resized, `${kegiatan.cover}-cover.jpeg`);

    const response = await directus.request(uploadFiles(data));
    updateCover(response.id);
  }

  return (
    <div className="flex flex-col max-w-sm gap-y-2">
      <div className="relative flex-row pt-4 h-200">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 w-[200px] h-[110px] bg-white opacity-80">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 items-center justify-center rounded-sm drop-shadow-sm w-[200px] h-[110px]">
          {cover ? (
            <img
              src={cover}
              alt="@testing"
              style={{ objectFit: "contain", maxHeight: 110, maxWidth: 200 }}
            />
          ) : (
            <span className="flex items-center justify-center">
              <LucideImage className="w-16 h-16" />
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row space-x-2 mt-[100px]">
        <GalleryInput
          folderId={kegiatan.organisasi?.coverFolder as string}
          onValueChange={(value) => {
            setLoading(true);
            setCover(assetUrl(value));
            updateCover(value);
          }}
        />
        <Button asChild size={"sm"}>
          <Label htmlFor="uploadFoto" style={{ whiteSpace: "nowrap" }}>
            {loading && uploading ? (
              <LucideLoader2 className="animate-spin" />
            ) : (
              <LucideImagePlus className="flex h-6 w-6" />
            )}
            Upload
            <Input
              id="uploadFoto"
              type="file"
              name="foto"
              style={{ visibility: "hidden", display: "none" }}
              hidden={true}
              onChange={async (e) => {
                setLoading(true);
                setUploading(true);
                await handleChange(e);
                setUploading(false);
                setLoading(false);
              }}
            />
          </Label>
        </Button>
      </div>
    </div>
  );
}
