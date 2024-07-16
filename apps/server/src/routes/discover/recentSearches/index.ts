import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { addSearch, clearSearches, getRecentSearches, removeSearch } from './controller';
import { addSearchSchema, removeSearchSchema } from './schema';

export const recentSearchesRouter = router({
  list: protectedProcedure.query(getRecentSearches),
  add: protectedProcedure.input(addSearchSchema).mutation(addSearch),
  remove: protectedProcedure.input(removeSearchSchema).mutation(removeSearch),
  clear: protectedProcedure.mutation(clearSearches),
});
