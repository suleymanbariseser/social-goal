import { customAlphabet } from 'nanoid/non-secure';

type CreateCodeOptions = {
  /**
   * @default true
   */
  includeNumbers?: boolean;

  /**
   * @default true
   */
  includeSymbols?: boolean;

  /**
   * @default true
   */
  includeUppercase?: boolean;

  /**
   * @default true
   */
  includeLowercase?: boolean;

  /**
   * @default 10
   */
  length?: number;
};

const UPPERCASES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASES = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{};:,./<>?';

export const nanoid = ({
  includeLowercase = true,
  includeNumbers = true,
  includeSymbols = true,
  includeUppercase = true,
  length = 10,
}: CreateCodeOptions = {}) => {
  let alphabet = '';

  if (includeNumbers) alphabet += NUMBERS;
  if (includeLowercase) alphabet += LOWERCASES;
  if (includeUppercase) alphabet += UPPERCASES;
  if (includeSymbols) alphabet += SYMBOLS;

  const _nanoid = customAlphabet(alphabet, length);

  return _nanoid();
};
