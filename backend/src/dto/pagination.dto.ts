import { z } from 'zod';

export const PaginationSchema = z.object({
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
  cursor: z.coerce.number().optional(),
  where: z.string().optional(),
  orderBy: z.string().optional(),
});

export type PaginationDto = z.infer<typeof PaginationSchema>;
