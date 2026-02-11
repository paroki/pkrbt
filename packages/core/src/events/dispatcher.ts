import { EventEmitter } from "node:stream";
import { singleton } from "@pkrbt/util";
import type { IDispatcher } from "../contracts/dispatcher";
import type { EventMap } from "./event";

export class Dispatcher extends EventEmitter implements IDispatcher<EventMap> {
  on<K extends keyof EventMap>(
    event: K,
    listener: (...args: EventMap[K]) => void,
  ): this {
    return super.on(event, listener as (...args: any[]) => void);
  }

  async dispatch<K extends keyof EventMap>(
    event: K,
    ...args: EventMap[K]
  ): Promise<boolean> {
    return super.emit(event as string, ...args);
  }
}

export const dispatcher = singleton<Dispatcher>("service.dispatcher", () => {
  return new Dispatcher()
});
