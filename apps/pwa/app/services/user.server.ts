import cookie from "cookie";
import {
  AUTH_DIRECTUS_SESSION_COOKIE_NAME,
  DIRECTUS_URL,
} from "./config.server";
import { Directus, User } from "@pkrbt/directus";
import { jwtDecode } from "jwt-decode";
import { AuthenticatedUser } from "./auth.server";
import { sdkCreateClient } from "./directus.server";
import { readPolicies, readUserPermissions } from "@directus/sdk";
import { UserRole } from "~/pkg/auth/types";

export type DecodedJWT = {
  id: string;
  role: string;
  app_access: boolean;
  admin_access: boolean;
  session: string;
  exp: number;
};

export function getSessionToken(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = cookie.parse(cookieHeader);
  const sessionCookieName = AUTH_DIRECTUS_SESSION_COOKIE_NAME;

  if (Object.keys(cookies).includes(sessionCookieName)) {
    return cookies[sessionCookieName];
  }

  return undefined;
}

function extractPolicy(user: User) {
  const policies: string[] = [];

  if (user.policies.length > 0) {
    user.policies.map((item) => {
      policies.push(item.policy.name);
    });
  }

  return policies;
}

export async function getSessionUser(request: Request) {
  const token = getSessionToken(request);

  if (!token) {
    return undefined;
  }

  const jwt = jwtDecode(token) as DecodedJWT;

  const directus = new Directus({
    baseUrl: DIRECTUS_URL,
    token,
  });

  const { item } = await directus.user.read(jwt.id, {
    fields: [
      "id",
      "first_name",
      "last_name",
      "nama",
      { avatar: ["id", "width", "height", "title", "description"] },
      { foto: ["id", "width", "height", "title", "description"] },
      {
        role: ["id", "name", { policies: ["id", { policy: ["id", "name"] }] }],
      },
      {
        policies: [
          "id",
          {
            policy: ["id", "name"],
          },
        ],
      },
    ],
  });

  let user: AuthenticatedUser | undefined;

  if (item) {
    if (!item.nama) {
      item.nama = `${item.first_name} ${item.last_name}`;
    }

    const policies = extractPolicy(item);
    const { nama, foto, avatar } = item;
    const role: UserRole =
      (item.role?.name?.toLocaleLowerCase() as UserRole) ?? "user";
    user = {
      id: item.id,
      profile: {
        nama,
        foto,
        avatar,
      },
      expiredAt: jwt.exp,
      role: role,
      policies,
      token,
    };
  }

  return user;
}

export async function getUserPermissions(request: Request) {
  const directus = await sdkCreateClient(request);
  const permissions = await directus.request(readUserPermissions());

  return permissions as unknown as Permissions;
}

export async function getUserPolicies(request: Request) {
  const directus = await sdkCreateClient(request);
  const policies = await directus.request(
    readPolicies({
      fields: ["id", "name", "description"],
      filter: {
        _or: [
          {
            name: {
              _contains: "Pengurus Harian",
            },
          },
          {
            name: {
              _contains: "Bendahara",
            },
          },
        ],
      },
    }),
  );

  return policies;
}
