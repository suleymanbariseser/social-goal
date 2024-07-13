import { router } from '@/config/trpc';
import { getRecentSearches } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const discoverRouter = router({
  recentSearches: protectedProcedure.query(getRecentSearches),
});
