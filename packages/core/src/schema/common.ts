import { z } from '../util'

export const schDelete = z.object({
  id: z.uuidv7(),
  force: z.boolean().optional().default(false)
})
