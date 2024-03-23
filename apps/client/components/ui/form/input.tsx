import Color from 'color';
import { forwardRef } from 'react';
import { Control, FieldPathValue, Path, useController } from 'react-hook-form';
import type { TextInput } from 'react-native';
import { Stack, Input as TInput, getTokens, styled } from 'tamagui';

import { Text } from '../text';

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

export const StyledInput = styled(TInput, {
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

type BaseInputProps = React.ComponentProps<typeof StyledInput> & {
  error?: boolean;
  helperText?: string;
};

export const BaseInput = forwardRef<TextInput, BaseInputProps>(
  ({ error, helperText, disabled, ...rest }, ref) => {
    const color = error ? getTokens().color.$errorMain.val : getTokens().color.$textPrimary.val;

    return (
      <Stack gap="$2" opacity={disabled ? 0.5 : 1}>
        <StyledInput
          ref={ref}
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
  }
);

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
