import { inferAsyncReturnType } from '@trpc/server';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';

export async function createContext({ req }: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      return token;
    }
    
    return null;
  }

  const token = await getUserFromHeader();

  return {
    token,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
