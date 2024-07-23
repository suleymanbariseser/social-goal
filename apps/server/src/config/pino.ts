import { MiddlewareFunction } from '@trpc/server';
import pino from 'pino';

export const logger = pino({
  level: 'error',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty',
  },
});

export const loggerMiddleware: MiddlewareFunction<any, any> = async (opts) => {
  const start = Date.now();

  const result = await opts.next();

  const durationMs = Date.now() - start;

  const meta = { path: opts.path, type: opts.type, durationMs };

  if (result.ok) {
    logger.info({
      data: result.data,
      meta,
      input: opts.rawInput
    });
  } else {
    logger.error({
      error: {
        message: result.error.message,
        code: result.error.code,
        stack: result.error.stack,
      },
      meta,
      input: opts.rawInput
    });
  }

  return result;
};
