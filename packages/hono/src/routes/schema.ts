/**
 * Common Schema
 */
import { z } from '@pkrbt/core'

export const IdParams = z.object({
  id: z.uuidv7().openapi({
    param: {
      name: "id",
      in: "path"
    },
  })
})
