import { UserR } from "@pkrbt/directus";
import { Await } from "@remix-run/react";
import { Suspense } from "react";
import { cn } from "~/common/utils";
import Loading from "~/components/Loading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/shadcn/avatar";
import { Separator } from "~/components/shadcn/separator";
import { useRootOutletContext } from "~/hooks/outlets";
import { Badge } from "~/components/shadcn/badge";
import { useUserPolicies, useUserRoles } from "../hooks";
import PoliciesDropdown from "./PoliciesDropdown";
import RoleDropdown from "./RoleDropdown";

function UserList({ items }: { items: UserR[] }) {
  const { directusUrl } = useRootOutletContext();
  const { policies, loading: policiesLoading } = useUserPolicies();
  const { roles, loading: rolesLoading } = useUserRoles();

  return (
    <div className="flex flex-row w-full flex-wrap gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex flex-col w-full max-w-sm",
            "p-4 gap-y-4",
            "bg-white border rounded-md drop-shadow-md",
          )}
        >
          <div className={cn("flex flex-row gap-4")}>
            <div className="flex flex-col gap-2 items-center w-full max-w-[100px]">
              <Avatar className="h-16 w-16 border">
                {item.avatar && (
                  <AvatarImage
                    src={`${directusUrl}/assets/${item.avatar}`}
                    alt="avatar"
                  />
                )}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>
                <Badge>{item.role?.name}</Badge>
              </span>
            </div>
            <div className="flex flex-col flex-grow w-full">
              <div className="flex flex-col space-y-1">
                <span className="font-bold">
                  {item.nama !== null
                    ? item.nama
                    : `${item.first_name} ${item.last_name}`}
                </span>
                {item.policies.length > 0 && (
                  <div className="flex flex-row flex-wrap gap-1">
                    {item.policies.map((policy, j) => {
                      const key = `${item.id}-${j}`;
                      return (
                        <Badge key={key} variant={"destructive"}>
                          {policy.policy.name}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-grow"></div>
          <div className={cn("flex flex-row gap-2")}>
            {rolesLoading ? (
              <Loading />
            ) : (
              <RoleDropdown roles={roles} user={item} />
            )}
            {policiesLoading ? (
              <Loading />
            ) : (
              <PoliciesDropdown policies={policies} user={item} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminUserList({ users }: { users: Promise<UserR[]> }) {
  return (
    <div className="flex flex-col w-full items-start">
      <h1 className="text-2xl font-bold m-0 p-0">Users</h1>
      <Separator className="mb-4" />
      <Suspense fallback={<Loading />}>
        <Await resolve={users}>{(users) => <UserList items={users} />}</Await>
      </Suspense>
    </div>
  );
}
