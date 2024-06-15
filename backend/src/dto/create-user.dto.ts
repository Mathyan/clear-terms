import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    username: z.string(),
    name: z.string().optional(),
    email: z.string(),
    password: z.string().min(8),
  })
  .refine(
    (data) => {
      if (!data.name) {
        data.name = data.username;
      }
      return true;
    },
    {
      message: 'Name is set to username if not provided',
      path: ['name'], // path of the error
    },
  );

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
