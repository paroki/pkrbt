import { AsyncLocalStorage } from "node:async_hooks"
import type { Session, User } from "./entity"

export type Context = {
  user: User,
  session: Session
}

export const ContextStorage = new AsyncLocalStorage<Context>()

export function getContext(): Context{
  const context = ContextStorage.getStore()

  if(!context){
    throw new Error("context uninitialized")
  }

  return context
}
