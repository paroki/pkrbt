import { UserR } from "@pkrbt/directus";
import _ from "lodash";
import { ComponentPropsWithoutRef, forwardRef, LegacyRef } from "react";
import { cn } from "~/common/utils";
import { Label } from "~/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "~/components/shadcn/radio-group";
import { useRootOutletContext } from "~/hooks/outlets";

type Props = ComponentPropsWithoutRef<typeof RadioGroup> & {
  user?: UserR;
};

function Component(
  { ...props }: Props,
  ref: LegacyRef<HTMLDivElement> | undefined,
) {
  const { user } = useRootOutletContext();
  const namaWilayah = user.lingkungan
    ? user.lingkungan.nama
    : user.wilayah?.nama;
  const fullNamaWilayah = `${user.lingkungan ? "Lingkungan" : "Stasi"} ${namaWilayah}`;
  const options = [
    {
      label: fullNamaWilayah,
      value: "wilayah",
      description: `Kegiatan dilaksanakan oleh ${fullNamaWilayah}`,
    },
    {
      label: "Organisasi",
      value: "organisasi",
      description: "Kegiatan dilaksanakan oleh organisasi paroki",
    },
  ];

  return (
    <RadioGroup {...props} ref={ref}>
      {options.map((item, index) => (
        <div
          key={`organisasi-${index}`}
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

const JenisPelaksanaRadio = forwardRef(Component);
export default JenisPelaksanaRadio;
