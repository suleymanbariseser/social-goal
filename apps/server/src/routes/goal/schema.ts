import { z } from 'zod';
import moment from 'moment';

export const createGoalSchema = z
  .object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 characters long'),
    category: z.array(z.number()),
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

export const goalActivitiesSchema = z
  .object({
    id: z.number({
      required_error: 'User id is required',
    }),
    startDate: z.date({
      required_error: 'Start date is required',
    }),
    endDate: z.date({
      required_error: 'End date is required',
    }),
  })
  .refine((data) => moment(data.startDate).isBefore(moment(data.endDate)), {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

export const goalSummarySchema = z.object({
  id: z.number({
    required_error: 'User id is required',
  }),
});

const DEFAULT_LIMIT = 10;
const MIN_LIMIT = 5;
const MAX_LIMIT = 100;

export const goalListSchema = z.object({
  q: z.string().nullish(),
  userId: z.number().nullish(),

  // TODO use infiniteschema to validate this
  limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).nullish(),
  cursor: z.number().nullish(),
  timestamp: z.date(),
});

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type GoalActivitiesInput = z.infer<typeof goalActivitiesSchema>;
export type GoalSummaryInput = z.infer<typeof goalSummarySchema>;
export type GoalListInput = z.infer<typeof goalListSchema>;
