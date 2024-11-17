import { PropsWithChildren, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigation, useOutletContext } from "@remix-run/react";
import { Progress } from "../shadcn/progress";
import { RootOutletContext } from "~/root";
import { cn } from "~/common/utils";

type Props = PropsWithChildren;

export default function DefaultLayout({ children }: Props) {
  const { loading } = useOutletContext<RootOutletContext>();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(1);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (navigation.state === "idle" && !loading) {
      setShowProgress(false);
    } else {
      setShowProgress(true);
    }
  }, [navigation, loading]);

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
    <div className="w-full min-h-screen bg-slate-100">
      <Header />
      {showProgress && progress >= 3 && (
        <div className="min-w-full absolute h-1">
          <Progress value={progress} className="w-[100%] h-1" />
        </div>
      )}
      <main
        className={cn(
          "flex mx-2 items-center justify-center mt-4",
          "sm:mx-4",
          "lg:mx-auto",
        )}
      >
        {children}
      </main>
    </div>
  );
}
