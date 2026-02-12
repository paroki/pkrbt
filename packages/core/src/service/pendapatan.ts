import type { IDispatcher } from "../contracts/dispatcher";
import type { IPendapatanRepository } from "../contracts/repository";
import type { IPendapatanService } from "../contracts/service";
import type { Pendapatan } from "../entity";
import type { EventMap } from "../events/event";
import { BaseService } from "./base";

export class PendapatanService
  extends BaseService<Pendapatan>
  implements IPendapatanService
{
  constructor(dispatcher: IDispatcher<EventMap>, repo: IPendapatanRepository) {
    super("Pendapatan", dispatcher, repo);
  }
}
