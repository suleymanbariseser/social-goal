import { z } from 'zod';

export const searchRecommendationSchema = z.object({
  q: z.string({ required_error: 'Search query is required' }),
});

export type SearchRecommendationInput = z.infer<typeof searchRecommendationSchema>;