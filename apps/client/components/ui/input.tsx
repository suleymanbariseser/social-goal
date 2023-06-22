import Color from 'color';
import { Control, FieldPathValue, Path, useController } from 'react-hook-form';
import { Stack, Input as TInput, styled } from 'tamagui';

import Text from './text';

const BaseInput = styled(TInput, {
  name: 'Input',

  br: '$12',
  px: '$4',
  backgroundColor: '$backgroundTransparent',
  borderColor: '$textPrimary',
  color: '$textPrimary',
  borderRadius: '$12',
  autoCapitalize: 'none',
  autoCorrect: false,

  minHeight: 50,

  focusStyle: {
    borderColor: '$textPrimary',
  },
});
type BaseInputProps = React.ComponentProps<typeof BaseInput> & {
  error?: boolean;
  helperText?: string;
};

export const Input = ({ error, helperText, disabled, ...rest }: BaseInputProps) => {
  // TODO replace values with theme colors
  const color = error ? '#E53535' : '#FFFFFF';

  return (
    <Stack gap="$2" opacity={disabled ? 0.5 : 1}>
      <BaseInput
        {...rest}
        placeholderTextColor={Color(color).alpha(0.7).toString()}
        disabled={disabled}
        editable={!disabled}
        borderColor={color}
        focusStyle={{
          borderColor: color,
        }}
      />
      {helperText && (
        <Text variant="body3" color={color}>
          {helperText}
        </Text>
      )}
    </Stack>
  );
};

type ControlledInputProps<T, Context = any> = Omit<BaseInputProps, 'defaultValue'> & {
  control: Control<T, Context>;
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
};

export const ControlledInput = <T extends object, Context = any>({
  control,
  name,
  ...rest
}: ControlledInputProps<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: rest?.defaultValue ?? undefined,
  });

  return (
    <Input {...rest} value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
  );
};
