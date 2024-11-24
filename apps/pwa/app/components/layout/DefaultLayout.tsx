import { PropsWithChildren, useEffect, useState } from "react";
import Header from "./Header";
import { Progress } from "../shadcn/progress";
import { cn } from "~/common/utils";
import { useNavigation } from "@remix-run/react";
import { UserContext } from "~/root";

export default function DefaultLayout({
  children,
  user,
}: {
  user: UserContext;
} & PropsWithChildren) {
  const [showProgress, setShowProgress] = useState(false);
  const nav = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (nav.state === "submitting" || nav.state === "loading") {
      setShowProgress(true);
    } else if (nav.state === "idle" && progress) {
      setShowProgress(false);
    }
  }, [nav.state, progress, showProgress]);

  useEffect(() => {
    if (!showProgress) {
      setProgress(1);
    } else {
      const value = 100 === progress ? 1 : progress + 1;
      const timer = setTimeout(() => setProgress(value), 100);
      return () => clearTimeout(timer);
    }
  }, [progress, showProgress]);

  return (
    <div data-wrapper="" className="border-border/40 dark:border-border">
      <div className="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
        <Header user={user} />
        {showProgress && progress >= 3 && (
          <div className="min-w-full absolute z-50">
            <Progress
              value={progress}
              className="absolute w-[100%] h-1 bg-blue-500"
            />
          </div>
        )}

        <main className={cn("flex-1 px-2 mt-2 md:p-0")}>{children}</main>
      </div>
    </div>
  );
}
