import { Control, FieldPathValue, Path, useController } from 'react-hook-form';

import { BaseInput, BaseInputProps } from './base-input';

type InputProps<T, Context = any> = Omit<BaseInputProps, 'defaultValue'> & {
  control: Control<T, Context>;
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
};

export const Input = <T extends object, Context = any>({
  control,
  name,
  ...rest
}: InputProps<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: rest?.defaultValue ?? undefined,
  });

  return (
    <BaseInput {...rest} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
  );
};
