export type EventNameType = string | symbol

export interface IDispatcher<T extends Record<EventNameType,any[]>>{
  on<K extends keyof T>(event: K, listener: (...args:T[K]) => void): this
  dispatch<K extends keyof T>(event: K, ...args: T[K]): Promise<boolean>
  // once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this
  // off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this
}
