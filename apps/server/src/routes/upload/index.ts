import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { uploadImageSchema } from './schema';
import { uploadImage } from './controller';

export const uploadRouter = router({
  image: protectedProcedure.input(uploadImageSchema).mutation(uploadImage),
});
