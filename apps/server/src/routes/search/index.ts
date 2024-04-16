import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { searchRecommendation } from './controller';
import { searchRecommendationSchema } from './schema';

export const searchRouter = router({
  recommendation: protectedProcedure.input(searchRecommendationSchema).query(searchRecommendation),
});
