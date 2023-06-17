import type { AppRouter } from '@social-goal/server/src/routes/index';
import { httpBatchLink, createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: '',
        };
      },
    }),
  ],
  transformer: null,
});
