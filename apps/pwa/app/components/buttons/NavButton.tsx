import { ComponentPropsWithRef } from "react";
import { Button } from "../shadcn/button";
import { Link } from "@remix-run/react";
import { useLoading, useSubmitting } from "~/hooks/loading";
import { StepBack } from "lucide-react";

type Props = ComponentPropsWithRef<typeof Button> & {
  to: string;
  label: string;
};

export default function NavButton({ to, label, ...props }: Props) {
  const loading = useLoading();
  const submitting = useSubmitting();
  return (
    <Button
      {...props}
      asChild
      disabled={loading || submitting}
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-600/90"
    >
      <Link to={to}>
        <StepBack />
        {label}
      </Link>
    </Button>
  );
}
