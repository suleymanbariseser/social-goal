import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function createContext({ req }: CreateExpressContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      const user = jwt.decode(token) as JwtPayload & { id: number };

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
