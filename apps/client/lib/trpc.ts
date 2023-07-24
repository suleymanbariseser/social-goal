import { AppRouter } from '@social-goal/server/src/routes';
import { httpBatchLink, createTRPCReact } from '@trpc/react-query';
import { authTokenState } from 'store/auth';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: authTokenState.get() ? `Bearer ${authTokenState.get()}` : '',
        };
      },
    }),
  ],
  transformer: superjson,
});
