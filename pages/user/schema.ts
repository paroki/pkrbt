import { z } from "shared/utils";

const stringOrArraySchema = z.union([z.string(), z.array(z.string())]);
type StringOrArray = z.infer<typeof stringOrArraySchema>;

export const UserFormSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  role: z.union([z.string(), z.array(z.string())]),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;
