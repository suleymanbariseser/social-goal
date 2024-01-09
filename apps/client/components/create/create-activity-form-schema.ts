import { createActivitySchema } from '@app/server/src/routes/activity/schema';
import { z } from 'zod';

export const createActivityFormSchema = createActivitySchema.extend({
  assets: z
    .object({
      uri: z.string(),
      loading: z.literal(false, {
        errorMap: (issue) => ({ message: 'One or more assets are still uploading. Please wait.' }),
      }),
      failed: z.literal(false, {
        errorMap: (issue) => ({
          message:
            'One or more assets failed to upload. Please remove them or try uploading again.',
        }),
      }),
    })
    .array()
    .nullable(),
});

export type CreateActivityFormSchema = z.infer<typeof createActivityFormSchema>;
