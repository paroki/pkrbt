import _ from "lodash";
import { ComponentProps, forwardRef, LegacyRef } from "react";
import { cn } from "~/common/utils";
import { Label } from "~/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "~/components/shadcn/radio-group";
import { useRootOutletContext } from "~/hooks/outlets";

type Props = ComponentProps<typeof RadioGroup>;
function LingkupKegiatanComponent(
  { ...props }: Props,
  ref: LegacyRef<HTMLDivElement> | undefined,
) {
  const { user } = useRootOutletContext();
  const fullNamaWilayah = user.lingkungan
    ? `Lingkungan ${user.lingkungan.nama}`
    : `Stasi ${user.wilayah?.nama}`;
  const options = [
    {
      label: "Terbuka",
      value: "terbuka",
      description: `Kegiatan untuk semua umat di paroki atau ${fullNamaWilayah}`,
    },
    {
      label: "Terbatas",
      value: "terbatas",
      description: `Kegiatan yang diperuntukan hanya bagi para pengurus organisasi atau pengurus ${fullNamaWilayah}`,
    },
  ];
  return (
    <RadioGroup ref={ref} {...props}>
      {options.map((item, index) => (
        <div
          key={`lingkup-${index}`}
          className={cn("flex items-center space-x-2")}
        >
          <RadioGroupItem id={_.kebabCase(item.label)} value={item.value} />
          <Label
            htmlFor={_.kebabCase(item.label)}
            className="flex flex-col cursor-pointer"
          >
            {item.label}
            <span className="text-xs font-normal">{item.description}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default forwardRef(LingkupKegiatanComponent);
