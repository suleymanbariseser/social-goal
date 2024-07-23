import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { addSearch, clearSearches, getRecentSearches, deleteSearch } from './controller';
import { addSearchSchema, deleteSearchSchema } from './schema';

export const recentSearchesRouter = router({
  list: protectedProcedure.query(getRecentSearches),
  add: protectedProcedure.input(addSearchSchema).mutation(addSearch),
  delete: protectedProcedure.input(deleteSearchSchema).mutation(deleteSearch),
  clear: protectedProcedure.mutation(clearSearches),
});
