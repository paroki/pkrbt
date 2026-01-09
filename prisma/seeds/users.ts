import { service } from "services";
import { faker } from "shared/utils";
import invariant from "tiny-invariant";
import { auth } from "~/lib/auth.server";
import prisma from "~/lib/prisma.server";

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

export async function genAdminUsers() {
  invariant(ADMIN_NAME, "ADMIN_NAME unconfigured");
  invariant(ADMIN_EMAIL, "ADMIN_EMAIL unconfigured");
  invariant(ADMIN_PASSWORD, "ADMIN_PASSWORD unconfigured");

  const existing = await service.user.findByEmail(ADMIN_EMAIL);
  if (!existing) {
    await auth.api.createUser({
      body: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      },
    });
  }
}

export async function genFakeUsers() {
  await prisma.user.deleteMany({
    where: {
      NOT: {
        email: ADMIN_EMAIL,
      },
    },
  });

  for (let i = 0; i < 50; i++) {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    await auth.api.createUser({
      body: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        password: "testing",
        role: ["user"],
      },
    });
  }
}
