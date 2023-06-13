import { customAlphabet } from 'nanoid';

type CreateCodeOptions = {
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
};

const UPPERCASES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASES = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{};:,./<>?';

export const createCode = (options: CreateCodeOptions) => {
  let alphabet = '';
  
  if (options.includeNumbers) alphabet += NUMBERS;
  if (options.includeLowercase) alphabet += LOWERCASES;
  if (options.includeUppercase) alphabet += UPPERCASES;
  if (options.includeSymbols) alphabet += SYMBOLS;

  const nanoid = customAlphabet(alphabet, options.length || 10);

  return nanoid();
};
