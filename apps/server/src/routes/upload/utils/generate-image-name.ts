import { nanoid } from '@packages/helpers';

type Options = {
  userId: number;
};

export const generateImageName = ({ userId }: Options) => {
  const random = nanoid({ includeSymbols: false });
  const date = Date.now();
  
  return `${userId}_${date}_${random}`;
};
