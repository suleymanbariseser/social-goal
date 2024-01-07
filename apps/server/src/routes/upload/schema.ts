import { z } from 'zod';

export const uploadImageSchema = z.object({
  data: z.string({
    required_error: 'Image is required',
  }),
  category: z.enum(['activity', 'comment', 'profile'], {
    required_error: 'Category is required',
  }),
});

export type UploadImageInput = z.infer<typeof uploadImageSchema>;
