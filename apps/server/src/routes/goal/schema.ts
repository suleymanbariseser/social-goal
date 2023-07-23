import { z } from 'zod';
import moment from 'moment';

export const createGoalSchema = z
  .object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 characters long'),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(3, 'Description must be at least 3 characters long'),
    startDate: z
      .date({
        required_error: 'Start date is required',
      })
      .min(moment().toDate(), 'Start date must be in the future')
      .max(moment().add(1, 'year').toDate(), 'Start date must be less than 1 year in the future'),
    endDate: z
      .date({
        required_error: 'End date is required',
      })
      .min(new Date(), 'End date must be in the future')
      .max(moment().add(1, 'year').toDate(), 'End date must be less than 1 year in the future'),
  })
  .superRefine((data, ctx) => {
    if (!moment(data.startDate).isBefore(moment(data.endDate))) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date must be after start date',
        path: ['endDate'],
      });
    }
  });

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
