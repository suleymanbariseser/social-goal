import { TRPCError } from '@trpc/server';
import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';

export const verifyUser = (token: string) => {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET!) as JwtPayload & { id: number };
  } catch (err) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      cause: err instanceof JsonWebTokenError ? err.message : undefined,
    });
  }
};
