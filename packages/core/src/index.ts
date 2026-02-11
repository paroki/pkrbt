import { singleton } from "@pkrbt/util"
import { dispatcher } from "./events/dispatcher"
import { PendapatanRepository } from "./infra/prisma/repository/pendapatan"
import { PendapatanService } from "./service"

export * from "./entity"
export * from "./model"
export * from './service'


/**
 * repository implementation
 */
const repository = {
  pendapatan: singleton<PendapatanRepository>("repository.pendapatan", () => {
    return new PendapatanRepository()
  })
}

/**
 * simple dependency injection (DI)
 */
export const service = {
  dispatcher,
  pendapatan: singleton<PendapatanService>("service.pendapatan", () => {
    return new PendapatanService(dispatcher, repository.pendapatan)
  })
}

