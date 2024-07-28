import { Control, FieldPathValue, Path, useController } from 'react-hook-form';

import { BaseSelect, BaseSelectProps } from './base-select';
import { SelectAction } from './select-action';
import { SelectHeader } from './select-header';
import { SelectTitle } from './select-title';

type SelectProps<T, Context = any> = Omit<BaseSelectProps, 'defaultValue' | 'onChange'> & {
  control: Control<T, Context>;
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
};

export const Select = <T extends object, Context = any>({
  control,
  name,
  ...rest
}: SelectProps<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: rest?.defaultValue ?? undefined,
  });

  return <BaseSelect {...rest} value={field.value} onChange={field.onChange} />;
};

Select.Header = SelectHeader;
Select.Title = SelectTitle;
Select.Action = SelectAction;
