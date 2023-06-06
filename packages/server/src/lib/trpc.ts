import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions) => ({});

export type Context = inferAsyncReturnType<typeof createContext>;
