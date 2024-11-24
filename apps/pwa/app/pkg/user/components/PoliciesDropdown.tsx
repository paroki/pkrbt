import { UserPolicy, UserR } from "@pkrbt/directus";
import { useFetcher } from "@remix-run/react";
import { LoaderCircleIcon, LucideUserPlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/shadcn/dropdown-menu";

export default function PoliciesDropdown({
  policies = [],
  user,
}: {
  policies: UserPolicy[];
  user: UserR;
}) {
  const [userPolicies, setUserPolicies] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    const pols: string[] = [];
    user.policies.map((item) => {
      pols.push(item.policy.id);
    });
    setUserPolicies(pols);
  }, [user]);

  useEffect(() => {
    if (fetcher.state === "idle" && submitting) {
      setSubmitting(false);
    }
  }, [fetcher.state, submitting]);

  function setPolicy(policyId: string, checked: boolean) {
    let pols: string[] = userPolicies;

    if (checked) {
      if (!pols.includes(policyId)) {
        pols.push(policyId);
      }
    } else {
      const newPols: string[] = [];
      pols.map((item) => {
        if (item !== policyId) {
          newPols.push(item);
        }
      });
      pols = newPols;
    }
    setUserPolicies(pols);
    setSubmitting(true);
    fetcher.submit(
      {
        intent: "update-policies",
        payload: {
          userId: user.id,
          policies: pols,
        },
      },
      {
        method: "POST",
        encType: "application/json",
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={"destructive"} disabled={submitting}>
          {submitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <LucideUserPlus2 />
          )}
          Policy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {policies.map((item) => (
          <DropdownMenuCheckboxItem
            key={`policy-${user.id}-${item.id}`}
            checked={userPolicies.includes(item.id)}
            onCheckedChange={(checked) => setPolicy(item.id, checked)}
          >
            {item.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
