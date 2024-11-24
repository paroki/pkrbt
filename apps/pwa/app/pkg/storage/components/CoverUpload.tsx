import { Input } from "~/components/shadcn/input";
import { useRootOutletContext } from "~/hooks/outlets";

export default function CoverUpload() {
  const { directusToken } = useRootOutletContext();
  console.log(directusToken);

  return (
    <div>
      <Input type="file" />
    </div>
  );
}
