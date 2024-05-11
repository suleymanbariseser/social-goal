import Color from 'color';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { TextInput } from 'react-native';
import { Stack, Input as TInput, getTokens, styled } from 'tamagui';

import { Box } from '../../Box';
import { Text } from '../../text';

export const StyledInput = styled(TInput, {
  name: 'Input',

  bg: 'transparent',
  col: '$textPrimary',
  autoCapitalize: 'none',
  autoCorrect: false,
  f: 1,
  py: '$4',

  unstyled: true,

  focusStyle: {
    boc: '$textPrimary',
  },
});

export type BaseInputProps = React.ComponentProps<typeof StyledInput> & {
  error?: boolean;
  helperText?: string;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const BaseInputContainer = styled(Box, {
  name: 'BaseInputContainer',
  px: '$4',

  brw: 1,
  bbw: 1,
  blw: 1,
  btw: 1,
  boc: '$backgroundBox',
  bs: 'solid',
});

export const BaseInput = forwardRef<TextInput, BaseInputProps>(
  ({ error, helperText, disabled, startAdornment, endAdornment, ...rest }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const color = error ? getTokens().color.$errorMain.val : getTokens().color.$textPrimary.val;

    const handleContainerPress = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    return (
      <Stack gap="$2" opacity={disabled ? 0.5 : 1}>
        <BaseInputContainer
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          boc={error ? '$errorMain' : '$backgroundBox'}
          onPress={handleContainerPress}>
          <StyledInput
            ref={inputRef}
            {...rest}
            placeholderTextColor={Color(color).alpha(0.7).toString()}
            disabled={disabled}
            editable={!disabled}
            focusStyle={{
              boc: color,
            }}
          />
        </BaseInputContainer>
        {helperText && (
          <Text variant="body3" color={color}>
            {helperText}
          </Text>
        )}
      </Stack>
    );
  }
);
