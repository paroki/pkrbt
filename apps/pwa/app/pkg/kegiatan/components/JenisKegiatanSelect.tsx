import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn/select";
import useJenisKegiatan from "../hooks";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import { Button } from "~/components/shadcn/button";
import { LucideLoaderCircle, LucidePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/shadcn/dialog";
import JenisKegiatanForm from "./JenisKegiatanForm";

const JenisKegiatanSelect = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof Select>
  // eslint-disable-next-line react/prop-types
>(({ defaultValue, ...props }, ref) => {
  const { items, loading, reload, loaded } = useJenisKegiatan();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row gap-1 w-full">
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        <LucidePlus />
      </Button>
      {loading && !loaded ? (
        <Button variant={"outline"}>
          <LucideLoaderCircle className="animate-spin" />
          Loading
        </Button>
      ) : (
        <Select {...props} defaultValue={value}>
          <SelectTrigger ref={ref}>
            <SelectValue placeholder="Pilih Jenis Kegiatan" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.jenisKegiatan}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-sm">
          <DialogHeader>
            <DialogTitle>Jenis Kegiatan Baru</DialogTitle>
            <DialogDescription>menambah jenis kegiatan baru</DialogDescription>
          </DialogHeader>
          <JenisKegiatanForm
            onSubmitted={(value) => {
              reload();
              setValue(value.id);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
});
JenisKegiatanSelect.displayName = "JenisKegiatan";

export default JenisKegiatanSelect;
