import cookie from "cookie";
import {
  AUTH_DIRECTUS_SESSION_COOKIE_NAME,
  DIRECTUS_URL,
} from "./config.server";
import { Directus, User } from "@pkrbt/directus";
import { jwtDecode } from "jwt-decode";
import { AuthenticatedUser } from "./auth.server";

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

  user.role?.policies.map((item) => {
    if (!policies.includes(item.policy.id)) {
      policies.push(item.policy.id);
    }
  });

  user.policies.map((item) => {
    policies.push(item.policy.id);
  });

  console.log(policies);
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
    user = {
      id: item.id,
      profile: {
        nama,
        foto,
        avatar,
      },
      expiredAt: jwt.exp,
      policies,
      token,
    };
  }

  return user;
}
