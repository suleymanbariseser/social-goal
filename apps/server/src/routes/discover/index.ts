import { router } from '@/config/trpc';
import { recentSearchesRouter } from './recentSearches';

export const discoverRouter = router({
  recentSearches: recentSearchesRouter,
});
