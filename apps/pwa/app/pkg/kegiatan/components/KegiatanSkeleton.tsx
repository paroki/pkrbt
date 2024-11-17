import _ from "lodash";
import { Skeleton } from "~/components/shadcn/skeleton";

export default function KegiatanSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {_.times(3, (i) => (
        <div
          key={i}
          className="bg-white flex w-full items-center space-x-4 border rounded-md drop-shadow-md p-4"
        >
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
