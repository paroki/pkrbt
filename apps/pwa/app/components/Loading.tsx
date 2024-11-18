import { Loader2Icon } from "lucide-react";
import { Button } from "./shadcn/button";

export default function Loading() {
  return (
    <div className="flex flex-row flex-1 items-center justify-center mt-4">
      <Button disabled>
        <Loader2Icon className="animate-spin" />
        Loading ...
      </Button>
    </div>
  );
}
