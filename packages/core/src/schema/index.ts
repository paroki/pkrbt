import { schDelete } from "./common"
import { schPendapatan } from "./pendapatan"

export * from "./pendapatan"

export const schema = {
  deleteRequest: schDelete,
  pendapatan: schPendapatan
}
