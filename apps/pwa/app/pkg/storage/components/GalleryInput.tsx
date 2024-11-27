import { useFetcher } from "@remix-run/react";
import { ComponentProps, useEffect, useState } from "react";
import "react-photo-album/rows.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/shadcn/dialog";
import { DirectusFiles } from "../types";
import { MasonryPhotoAlbum, Photo } from "react-photo-album";
import { useStorageImage } from "../hooks";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "~/components/shadcn/button";
import { ImageIcon } from "lucide-react";

type Props = ComponentProps<typeof Dialog> & {
  folderId: string;
  title?: string;
  onValueChange?: (coverId: string) => void;
};

export default function GalleryInput({
  folderId,
  title = "Daftar Foto",
  onValueChange,
  ...props
}: Props) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher<DirectusFiles>();
  const { assetUrl } = useStorageImage();

  useEffect(() => {
    function loadFolder() {
      fetcher.load(`/storage/folders/${folderId}`);
      console.log("load folder");
    }
    if (open && !loaded) {
      loadFolder();
      setLoaded(true);
    } else if (!open && loaded) {
      setLoaded(false);
    }
  }, [open, loaded, fetcher, folderId]);

  useEffect(() => {
    if (loaded && fetcher.data && photos.length === 0) {
      const photos: Photo[] = [];
      fetcher.data.map((item) => {
        const { id, title, width, height } = item;
        const src = assetUrl(id);
        photos.push({
          title: title as string,
          key: id,
          alt: title !== null ? title : "pkrbt",
          src,
          width: width as number,
          height: height as number,
        });
      });
      setPhotos(photos);
    }
  }, [assetUrl, fetcher.data, loaded, folderId, photos.length]);

  return (
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <ImageIcon />
          Pilih Cover
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Pilih foto</DialogDescription>
        </DialogHeader>
        <MasonryPhotoAlbum
          photos={photos}
          onClick={(value) => {
            if (onValueChange) {
              onValueChange(value.photo.key as string);
            }
            setOpen(false);
          }}
          padding={4}
        />
      </DialogContent>
    </Dialog>
  );
}
