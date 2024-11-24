import { ComponentProps } from "react";
import { cn } from "~/common/utils";

type Props = ComponentProps<"div">;

export default function Container({
  className,
  ref,
  children,
  ...props
}: Props) {
  return (
    <div ref={ref} className={cn("min-h-screen md:mx-4", className)} {...props}>
      {children}
    </div>
  );
}
