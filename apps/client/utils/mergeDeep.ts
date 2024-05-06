import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import { DeepPartial } from 'react-hook-form';

export type MergeDeepPartial<All, T = All> = T extends object
  ? {
      [P in keyof T]?: MergeDeepPartial<All, T[P]>;
    }
  : T | ((oldValue: All) => T);

const getPartialValues = <T>(value: T, partial: MergeDeepPartial<T, T>): DeepPartial<T> => {
  const partialValues = {} as DeepPartial<T>;

  for (const key in partial) {
    const typedKey = key as string;
    const partialValue = partial[typedKey];

    if (typeof partialValue === 'function') {
      partialValues[typedKey] = partialValue(value[typedKey]);
    } else if (typeof partialValue === 'object') {
      partialValues[typedKey] = getPartialValues(value[typedKey], partialValue);
    } else {
      partialValues[typedKey] = partialValue;
    }
  }
  return partialValues;
};

export const mergeDeep = <T>(value: T, partial: MergeDeepPartial<T, T>): T => {
  const partialValues = getPartialValues(value, partial);

  return merge<T, DeepPartial<T>>(cloneDeep(value), partialValues);
};
