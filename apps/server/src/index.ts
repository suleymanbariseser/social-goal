import 'dotenv/config';

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { AppRouter, appRouter } from '@/routes';
import { createContext } from './context';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

const { server, listen } = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
});

const wss = new WebSocketServer({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext: () => {
    return {
      user: {
        id: 0,
      },
    };
  },
});

listen(+process.env.PORT!);
