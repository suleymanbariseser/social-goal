import { z } from 'zod';

export const profileSummarySchema = z.object({
  id: z.number({ required_error: 'Id is required' }),
});

export const userSettingsSchema = z.object({
  id: z.number({ required_error: 'Id is required' }),
})

export type ProfileSummaryInput = z.infer<typeof profileSummarySchema>;
export type UserSettingsInput = z.infer<typeof userSettingsSchema>;
