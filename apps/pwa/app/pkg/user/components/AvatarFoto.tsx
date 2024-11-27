import { deleteFile, uploadFiles } from "@directus/sdk";
import { ImageUpIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "~/components/shadcn/button";
import { Input } from "~/components/shadcn/input";
import { Label } from "~/components/shadcn/label";
import { RootOutletContext } from "~/root";
import { useDirectus } from "~/hooks/directus";
import ImageCropper from "~/components/form/ImageCropper";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/shadcn/avatar";

import { useFetcher, useNavigation, useOutletContext } from "@remix-run/react";
import { resizeImage } from "~/pkg/storage/utils";

export default function AvatarFoto() {
  const { directusUrl, user } = useOutletContext<RootOutletContext>();
  const fetcher = useFetcher();
  const directus = useDirectus();
  const folderAvatar = "56f14165-2e5a-459f-93e2-c3c56513c088";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    if (navigate.state !== "idle") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigate.state]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleChange(e: any) {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    const resized = await resizeImage(file);

    data.append("folder", folderAvatar);
    data.append("title", `${user.nama} foto`);
    data.append("file", resized, `${user.id}-foto`);

    if (user.foto) {
      await directus.request(deleteFile(user.foto.id));
    }
    try {
      const result = await directus.request(uploadFiles(data));
      fetcher.submit(
        {
          userId: user.id,
          fileId: result.id,
          intent: "foto",
        },
        {
          method: "POST",
          action: "/user/update",
          encType: "application/json",
        },
      );
      setImageSrc(`${directusUrl}/assets/${result.id}`);
      setDialogOpen(true);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }

  async function handleFotoCropped(cropped: string) {
    setLoading(true);
    const formData = new FormData();
    const response = await fetch(cropped);
    const file = await response.blob();

    formData.append("folder", folderAvatar);
    formData.append(`title`, `${user.nama} avatar`);
    formData.append("file", file, `${user.id}-avatar.jpeg`);

    try {
      const result = await directus.request(uploadFiles(formData));
      if (user.avatar) {
        await directus.request(deleteFile(user.avatar.id));
      }

      fetcher.submit(
        {
          userId: user.id,
          fileId: result.id,
          intent: "avatar",
        },
        {
          method: "POST",
          action: "/user/update",
          encType: "application/json",
        },
      );
    } catch (e) {
      console.log(e, null, 2);
    }
    setLoading(false);
  }

  function onAvatarClick() {
    if (user.foto) {
      setImageSrc(`${directusUrl}/assets/${user.foto.id}`);
      setDialogOpen(true);
    }
  }

  const defaultImage = user.avatar
    ? `${directusUrl}/assets/${user.avatar.id}`
    : "https://github.com/shadcn.png";

  return (
    <div className="flex flex-col gap-y-4">
      {imageSrc ? (
        <div>
          <ImageCropper
            imageSrc={imageSrc}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            imageCropped={handleFotoCropped}
          />
        </div>
      ) : (
        <Avatar
          className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
          onClick={onAvatarClick}
        >
          <AvatarImage src={defaultImage} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      <Button asChild>
        <Label htmlFor="uploadFoto" style={{ whiteSpace: "nowrap" }}>
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <ImageUpIcon className="flex h-6 w-6" />
          )}
          Ganti Foto
          <Input
            id="uploadFoto"
            type="file"
            name="foto"
            style={{ visibility: "hidden", display: "none" }}
            hidden={true}
            onChange={handleChange}
          />
        </Label>
      </Button>
    </div>
  );
}
