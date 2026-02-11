import type { IDispatcher } from "../contracts/dispatcher";
import type { Pendapatan } from "../entity";
import type { EventMap } from "../events/event";
import { BaseService } from "./base";
import type { IPendapatanRepository } from "./interfaces";

export class PendapatanService extends BaseService<Pendapatan> {
  constructor(dispatcher: IDispatcher<EventMap>, repo: IPendapatanRepository){
    super("Pendapatan", dispatcher, repo)
  }
}
