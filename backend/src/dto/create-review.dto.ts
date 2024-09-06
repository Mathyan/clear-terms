import { z } from 'zod';

export const CreateReviewSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateReviewSchemaDto = z.infer<typeof CreateReviewSchema>;
