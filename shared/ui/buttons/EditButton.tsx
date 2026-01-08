import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { PencilIcon } from "lucide-react";

type Props = {
  url?: string;
  cellMode?: boolean;
};

export function EditButton({ url, cellMode }: Props) {
  const asChild = url ? true : false;
  const size = cellMode ? "sm" : "default";
  const label = cellMode ? "" : "Edit";
  return (
    <Button
      asChild={asChild}
      size={size}
      className="bg-green-600 hover:bg-green-800"
    >
      {url ? (
        <Link to={url}>
          <PencilIcon /> {label}
        </Link>
      ) : (
        label
      )}
    </Button>
  );
}
