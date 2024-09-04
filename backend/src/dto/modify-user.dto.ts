import { z } from 'zod';

export const ModifyUserSchema = z.object({
  id: z.coerce.number(),
  username: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().min(8).optional(),
  role: z.coerce.number().optional(),
});

export type ModifyUserDto = z.infer<typeof ModifyUserSchema>;
