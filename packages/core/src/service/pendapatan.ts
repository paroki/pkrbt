import type { Pendapatan } from "../entity";
import type { IEventDispatcher } from "../events/event";
import { BaseService } from "./base";
import type { IPendapatanRepository } from "./interfaces";

export class PendapatanService extends BaseService<Pendapatan> {
  constructor(dispatcher: IEventDispatcher, repo: IPendapatanRepository){
    super("Pendapatan", dispatcher, repo)
  }
}
