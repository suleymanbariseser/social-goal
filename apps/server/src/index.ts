import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from '@/routes';
import 'dotenv/config';
import { createContext } from '@/lib/trpc';

const app = express();

app.use(
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
