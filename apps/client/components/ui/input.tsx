import Color from 'color';
import { Control, FieldPathValue, Path, useController } from 'react-hook-form';
import { Stack, Input as TInput, getTokens, styled } from 'tamagui';

import { Text } from './text';

export const defaultStyles = {
  px: '$4',
  py: '$4',

  brw: 1,
  bbw: 1,
  blw: 1,
  btw: 1,
  boc: '$backgroundBox',
  br: '$6',
  bs: 'solid',

  bg: 'transparent',
} as const;

export const BaseInput = styled(TInput, {
  name: 'Input',

  ...defaultStyles,
  col: '$textPrimary',
  autoCapitalize: 'none',
  autoCorrect: false,

  unstyled: true,

  focusStyle: {
    boc: '$textPrimary',
  },
});
type BaseInputProps = React.ComponentProps<typeof BaseInput> & {
  error?: boolean;
  helperText?: string;
};

export const Input = ({ error, helperText, disabled, ...rest }: BaseInputProps) => {
  const color = error ? getTokens().color.$errorMain.val : getTokens().color.$textPrimary.val;

  return (
    <Stack gap="$2" opacity={disabled ? 0.5 : 1}>
      <BaseInput
        {...rest}
        placeholderTextColor={Color(color).alpha(0.7).toString()}
        disabled={disabled}
        editable={!disabled}
        boc={error ? '$errorMain' : defaultStyles.boc}
        focusStyle={{
          boc: color,
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
