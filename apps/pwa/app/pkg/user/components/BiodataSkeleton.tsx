import _ from "lodash";
import { Skeleton } from "~/components/shadcn/skeleton";

export default function BiodataSkeleton() {
  return (
    <div className="bg-white flex flex-col w-full p-4 gap-y-4">
      {_.times(8, (i) => (
        <div key={i} className="flex flex-row gap-x-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </div>
  );
}
