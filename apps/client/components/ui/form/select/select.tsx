import { Control, FieldPathValue, Path, useController } from 'react-hook-form';

import { BaseSelect, BaseSelectProps } from './base-select';
import { SelectAction } from './select-action';
import { SelectHeader } from './select-header';
import { SelectTitle } from './select-title';

type SelectProps<T, Context = any> = Omit<BaseSelectProps, 'defaultValue'> & {
  control: Control<T, Context>;
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
  transform?: (value: string) => any;
};

export const Select = <T extends object, Context = any>({
  control,
  name,
  transform,
  ...rest
}: SelectProps<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: rest?.defaultValue ?? undefined,
  });

  return (
    <BaseSelect
      {...rest}
      value={field.value}
      onChange={(val) => field.onChange(transform ? transform(val) : val)}
    />
  );
};

Select.Header = SelectHeader;
Select.Title = SelectTitle;
Select.Action = SelectAction;
