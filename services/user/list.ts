import type { UserSearch } from "shared/types";
import prisma from "~/lib/prisma.server";

type FindManyArgs = Parameters<typeof prisma.user.findMany>[0];
export async function list(search: UserSearch, headers?: HeadersInit) {
  let findMany = {
    orderBy: {
      ...search.sorts,
    },
    skip: search.offset,
    take: search.limit,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    where: {},
  } satisfies FindManyArgs;

  if (search.keyword && search.keyword.length > 0) {
    findMany = {
      ...findMany,
      where: {
        OR: [
          {
            name: {
              contains: search.keyword,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search.keyword,
              mode: "insensitive",
            },
          },
        ],
      },
    };
  }

  const total = await prisma.user.count({
    where: findMany.where,
  });
  const users = await prisma.user.findMany(findMany);
  return { users, total };
}
