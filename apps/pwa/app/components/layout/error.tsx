import { Link } from "@remix-run/react";
import { Button } from "../shadcn/button";
import { BugIcon, LucideHome, OctagonAlertIcon } from "lucide-react";
import { cn } from "~/common/utils";
import { Separator } from "../shadcn/separator";
import { PropsWithChildren } from "react";

export default function ErrorLayout({
  title,
  type = "route",
  children,
}: {
  title: string;
  type: "route" | "error" | "bug";
} & PropsWithChildren) {
  return (
    <div className={cn("flex h-screen w-full items-center justify-center")}>
      <div
        className={cn("flex flex-col", "max-h-[200px] max-w-[600px]", "p-2")}
      >
        <div
          className={cn(
            "flex flex-col",
            "p-4",
            "bg-white border rounded-lg drop-shadow-lg",
          )}
        >
          <div className="flex flex-row text-3xl text-red-600 items-center gap-4 my-4">
            {type === "bug" ? (
              <BugIcon className="w-14 h-14" />
            ) : (
              <OctagonAlertIcon className="w-14 h-14" />
            )}
            <h1 className="text-4xl font-bold">Oops!</h1>
          </div>

          <Separator />
          <div className="flex flex-col my-8 gap-2">
            <h2 className="text-xl font-bold text-center text-red-600">
              {title}
            </h2>
            {children ? (
              <p>{children}</p>
            ) : (
              <p>
                Mohon maaf atas ketidaknyamanan ini. Kesalahan telah dilaporkan,
                dan{" "}
                <a
                  href="https://github.com/paroki/pkrbt"
                  className="text-blue-800 font-bold"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tim PKRBT Developers
                </a>{" "}
                akan segera mencari solusi untuk masalah ini.
              </p>
            )}
          </div>

          <Button asChild>
            <Link to="/">
              <LucideHome />
              Kembali
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
