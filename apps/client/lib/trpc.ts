import { AppRouter } from '@social-goal/server/src/routes';
import {
  httpBatchLink,
  createTRPCReact,
  createWSClient,
  splitLink,
  wsLink,
} from '@trpc/react-query';
import { authTokenState } from 'store/auth';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

const headers = async () => {
  return {
    Authorization: authTokenState.get() ? `Bearer ${authTokenState.get()}` : '',
  };
};

export const trpcClient = trpc.createClient({
  links: [
    splitLink({
      // if it is a subscription then use websocket otherwise use a http call
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: createWSClient({
          url: `ws://localhost:8000`,
        }),
      }),
      false: httpBatchLink({
        url: 'http://localhost:8000',
        headers,
      }),
    }),
  ],
  transformer: superjson,
});
