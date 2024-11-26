import Resizer from "react-image-file-resizer";

export function doResize(file: Blob) {
  return new Promise((resolve) => {
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
  }) as unknown as Promise<string>;
}

export async function resizeImage(file: Blob) {
  const resized = await doResize(file);
  const r = await fetch(resized);
  return r.blob();
}
