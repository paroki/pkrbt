import { singleton } from "@pkrbt/util";
import type { IPendapatanService } from "./contracts";
import type { IDispatcher } from "./contracts/dispatcher";
import { Dispatcher } from "./events/dispatcher";
import type { EventMap } from "./events/event";
import { PendapatanRepository } from "./infra/prisma";
import { PendapatanService } from "./service";

export const dispatcher = singleton<IDispatcher<EventMap>>("dispatcher", () => {
  return new Dispatcher();
});

export const pendapatan = singleton<IPendapatanService>(
  "service.pendapatan",
  () => {
    return new PendapatanService(dispatcher, new PendapatanRepository());
  },
);

export * from "./context";
export * from "./contracts";
export * from "./entity";
export { BaseError, ErrNotFound, isNotFound} from "./error";
export * from "./model";
export * from "./schema";
export * from "./service";

export { z } from "./util";
