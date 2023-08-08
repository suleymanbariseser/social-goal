import { inferAsyncReturnType } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { verifyUser } from './utils/verify-user';

export async function createContext({ req }: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      const user = verifyUser(token)

      if (user) return user;
    }
    return null;
  }

  const user = await getUserFromHeader();

  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
