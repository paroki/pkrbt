import type { IDispatcher } from "../contracts/dispatcher";
import type { EntityType } from "../entity";
import type {
  EventDeleted,
  EventMap,
  EventUpdated,
} from "../events/event";
import { Events } from "../events/event";
import type { CreateRequest, SearchRequest, UpdateRequest } from "../model";
import type { IRepository } from "./interfaces";

export abstract class BaseService<T extends EntityType> {
  protected dispatcher: IDispatcher<EventMap>;
  protected repository: IRepository<T>;
  protected entity: string;

  constructor(
    name: string,
    dispatcher: IDispatcher<EventMap>,
    repo: IRepository<T>,
  ) {
    this.entity = name;
    this.dispatcher = dispatcher;
    this.repository = repo;
  }

  async create(request: CreateRequest<T>): Promise<T> {
    const [data, error] = await this.repository.create(request);
    if (error) {
      throw error;
    }

    await this.dispatcher.dispatch(Events.Created, {
      entity: this.entity,
      after: data,
    });

    return data;
  }

  async update(id: string, request: UpdateRequest<T>): Promise<T> {
    // get before deleted data first
    const [before, errBefore] = await this.repository.find(id);
    if (errBefore) {
      throw errBefore;
    }

    // get after deleted data
    const [after, errAfter] = await this.repository.update(id, request);
    if (errAfter) {
      throw errAfter;
    }

    const evt = {
      entity: this.entity,
      after,
      before
    } satisfies EventUpdated
    await this.dispatcher.dispatch(Events.Updated, evt);

    return after;
  }

  async delete(id: string, force: boolean = false): Promise<T> {
    // get before deleted data first
    const [before, errBefore] = await this.repository.find(id);
    if (errBefore) {
      throw errBefore;
    }

    // get after deleted data
    const [after, errAfter] = await this.repository.delete(id, force);
    if (errAfter) {
      throw errAfter;
    }

    // dispatch the deleted event
    const evt: EventDeleted = {
      entity: this.entity,
      before,
      after,
    };
    await this.dispatcher.dispatch(Events.Deleted, evt);

    return after;
  }

  async find(id: string): Promise<T> {
    const [data, error] = await this.repository.find(id);

    if (error) {
      throw error;
    }

    return data;
  }

  async search(request: SearchRequest): Promise<{ items: T[]; total: number }> {
    const [data, error] = await this.repository.search(request);

    if (error) {
      throw error;
    }

    return data;
  }
}
