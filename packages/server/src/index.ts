import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from './routes';
import { createContext } from './lib/trpc';
import 'dotenv/config';

const app = express();

app.use(
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
