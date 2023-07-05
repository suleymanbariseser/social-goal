import { Spinner, Stack, TextProps, styled } from 'tamagui';

import Text from './text';

export const BaseButton = styled(Stack, {
  name: 'ButtonFrame',

  br: '$12',
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
    variant: {
      contained: {
        color: '$background',
      },
      text: {
        color: '$textPrimary',
      },
    },
  },

  defaultVariants: {
    variant: 'contained',
  },
});

interface Props extends React.ComponentProps<typeof BaseButton> {
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
  variant = 'contained',
  ...props
}: Props) => {
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
        <ButtonText variant={variant} {...textProps}>
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

export default Button;
