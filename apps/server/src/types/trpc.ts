import { Context } from '@/context';

export type InputOptions<T> = {
  input: T;
  ctx: Context;
};

export type ProtectedInputOptions<T> = InputOptions<T> & {
  ctx: {
    user: {
      id: number;
    };
  };
};
