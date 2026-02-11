import type { EntityType } from "../entity"

export const Events = {
  Created: "resource.created",
  Updated: "resource.updated",
  Deleted: "resource.deleted",
} as const

export type EventCreated = {
  entity: string
  after: EntityType
}

export type EventUpdated = {
  entity: string
  before: EntityType
  after: EntityType
}

export type EventDeleted = {
  entity: string
  before: EntityType
  after: EntityType
}

export type EventMap = {
  [Events.Created]: [evt: EventCreated]
  [Events.Updated]: [evt: EventUpdated]
  [Events.Deleted]: [evt: EventDeleted]
}

export type EventName = keyof EventMap
