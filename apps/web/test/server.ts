import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted", request.method, request.url);
});

server.events.on("request:unhandled", ({ request }) => {
  throw new Error(request.url);
});

export default server;
