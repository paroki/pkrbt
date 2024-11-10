"use client";

import { updateAvatar, updateFoto } from "../actions";
import { FileWithPreview, UserR } from "../types";
import { useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@pkrbt/ui/shadcn/avatar";
import { FileWithPath, useDropzone } from "react-dropzone";
import UserAvatar from "./UserAvatar";
import { DIRECTUS_FOLDER_AVATAR, DIRECTUS_URL } from "@/common/config";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: UserR;
};

const accept = {
  "image/*": [],
};

export default function AvatarUpload({ user }: Props) {
  const saveAvatar = updateAvatar.bind(null);
  const saveFoto = updateFoto.bind(null);
  const initial = user.avatar;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        alert("File yang anda gunakan terlalu besar!");
        return;
      }

      // const prefix = `file_1`;
      const formData = new FormData();
      formData.append("folder", DIRECTUS_FOLDER_AVATAR);
      formData.append(`title`, `${user.id}-foto`);
      formData.append("file", file);
      await saveFoto({
        formData,
        currentFotoId: user?.foto?.id ?? undefined,
        userId: user.id,
      });

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    [saveFoto, user],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const onCrop = async (cropped: string) => {
    const currentAvatarId = initial?.id ?? undefined;
    const formData = new FormData();
    const image = cropped.replace(/^data:image\/png;base64,/, "");

    console.log(image);
    const file = new Blob([Buffer.from(image, "base64")], {
      type: "image/png",
    });
    formData.append("folder", DIRECTUS_FOLDER_AVATAR);
    formData.append(`title`, `${user.id}-avatar`);
    formData.append("file", file, `${user.id}-avatar.png`);

    await saveAvatar({
      formData,
      currentAvatarId,
      userId: user.id,
    });
  };

  const avatarImage = initial
    ? `${DIRECTUS_URL}/assets/${initial.id}`
    : "https://github.com/shadcn.png";

  return (
    <div className="relative">
      {selectedFile ? (
        <UserAvatar
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          imageCropped={onCrop}
        />
      ) : (
        <Avatar
          {...getRootProps()}
          className="size-48 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
        >
          <input {...getInputProps()} />
          <AvatarImage src={avatarImage} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
