import React, { useState, useRef, Dispatch, SetStateAction } from "react";

// eslint-disable-next-line import/no-named-as-default
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcn/dialog";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Avatar, AvatarImage } from "../shadcn/avatar";
import { Button } from "../shadcn/button";
import { CropIcon } from "lucide-react";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

type Props = {
  imageSrc: string;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
  imageCropped: (data: string) => Promise<void>;
};

export default function ImageCropper({
  imageSrc,
  dialogOpen,
  setDialogOpen,
  imageCropped,
}: Props) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const aspect = 1;
  const scale = 1;
  const rotate = 0;

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function generateCroppedImage() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );

    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/jpeg",
    });

    setCroppedImage(URL.createObjectURL(blob));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
        await generateCroppedImage();
      }
    },
    100,
    [completedCrop, generateCroppedImage],
  );

  async function onCrop() {
    setDialogOpen(false);
    await imageCropped(croppedImage as string);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Avatar className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
          {completedCrop && dialogOpen && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          )}
          {!dialogOpen && <AvatarImage src={croppedImage} />}
        </Avatar>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Foto</DialogTitle>
          <DialogDescription>Crop Foto</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center w-full">
          {!!imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              // minWidth={400}
              minHeight={100}
              // circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                style={{
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                }}
                onLoad={onImageLoad}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          )}
        </div>
        <DialogFooter>
          <div className="flex flex-row w-full items-center justify-center">
            <Button onClick={onCrop} type="button">
              <CropIcon />
              Set Foto Profil
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
