import { ComponentPropsWithRef } from "react";
import { Button } from "../shadcn/button";
import { Link } from "@remix-run/react";
import { StepBack } from "lucide-react";
import { useLoading, useSubmitting } from "~/hooks/ui";
import { PropsWithAuth } from "../types";
import { useAuth } from "~/pkg/auth/hooks";

type Props = ComponentPropsWithRef<typeof Button> &
  PropsWithAuth & {
    to: string;
    label: string;
  };

export default function BackButton({
  to,
  label = "Kembali",
  role,
  policy,
  ...props
}: Props) {
  const loading = useLoading();
  const submitting = useSubmitting();
  const { ensureGranted } = useAuth();
  const granted = ensureGranted(role, policy);
  if (!granted) {
    return null;
  }

  return (
    <Button
      {...props}
      asChild
      disabled={loading || submitting}
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-600/90"
      size={"sm"}
    >
      <Link to={to}>
        <StepBack />
        {label}
      </Link>
    </Button>
  );
}
