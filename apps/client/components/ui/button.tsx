import { Spinner, Stack, TextProps, styled } from 'tamagui';

import { Text } from './text';

export const BaseButton = styled(Stack, {
  name: 'ButtonFrame',

  br: '$6',
  fd: 'row',
  ai: 'center',
  jc: 'center',
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

    variant: {
      contained: {
        bg: '$textPrimary',

        pressStyle: {
          bg: '$textSecondary',
        },
      },
      text: {
        bg: '$backgroundTransparent',

        pressStyle: {
          bg: '#ffffff05',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'contained',
  },
});

const ButtonText = styled(Text, {
  textAlign: 'center',

  variant: 'subtitle1',

  variants: {
    buttonVariant: {
      contained: {
        color: '$background',
      },
      text: {
        color: '$textPrimary',
      },
    },
  },

  defaultVariants: {
    buttonVariant: 'contained',
  },
});

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  isLoading?: boolean;
  textProps?: TextProps;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Button = ({
  children,
  textProps,
  isLoading,
  startAdornment,
  endAdornment,
  variant = 'contained',
  ...props
}: ButtonProps) => {
  return (
    <BaseButton variant={variant} {...props}>
      {startAdornment && (
        <Stack space="$2" alignItems="center" justifyContent="center">
          {startAdornment}
        </Stack>
      )}
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <ButtonText buttonVariant={variant} {...textProps}>
          {children}
        </ButtonText>
      )}
      {endAdornment && (
        <Stack space="$2" alignItems="center" justifyContent="center">
          {endAdornment}
        </Stack>
      )}
    </BaseButton>
  );
};
