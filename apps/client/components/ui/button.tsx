import { Spinner, Stack, StackProps, TextProps, styled } from 'tamagui';

import Text from './text';

export const BaseButton = styled(Stack, {
  name: 'ButtonFrame',

  backgroundColor: '$textPrimary',
  borderRadius: '$12',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',

  py: '$4',
  px: '$2.5',

  variants: {
    // style for disabled button
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },

  pressStyle: {
    backgroundColor: '$textSecondary',
  },
});

const ButtonText = styled(Text, {
  color: '$background',
  textAlign: 'center',

  variant: 'subtitle2',
});

interface Props extends StackProps {
  isLoading?: boolean;
  textProps?: TextProps;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Button = ({
  children,
  textProps,
  isLoading,
  startAdornment,
  endAdornment,
  ...props
}: Props) => {
  return (
    <BaseButton {...props}>
      {startAdornment && (
        <Stack space="$2" alignItems="center" justifyContent="center">
          {startAdornment}
        </Stack>
      )}
      {isLoading ? <Spinner size="small" /> : <ButtonText {...textProps}>{children}</ButtonText>}
      {endAdornment && (
        <Stack space="$2" alignItems="center" justifyContent="center">
          {endAdornment}
        </Stack>
      )}
    </BaseButton>
  );
};

export default Button;
