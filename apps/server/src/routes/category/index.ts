import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { getCategoryList } from './controller';

export const categoryRouter = router({
  list: protectedProcedure.query(getCategoryList),
});
