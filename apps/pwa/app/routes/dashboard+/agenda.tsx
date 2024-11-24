import { sleep } from "@directus/sdk";
import { defer } from "@remix-pwa/sw";
import { Await } from "@remix-run/react";
import { Suspense } from "react";
import Container from "~/components/layout/Container";
import Loading from "~/components/Loading";

async function doSleep() {
  await sleep(3000);
  return { status: "Hello World" };
}

export async function loader() {
  const sleeping = doSleep();
  return defer({ sleeping });
}

export default function Page() {
  const sleeping = { status: "hello world" };

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <Await resolve={sleeping}>
          {(sleeping) => {
            return (
              <div>
                <h1>{sleeping.status}</h1>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}
