import { Spinner, TextProps, styled } from 'tamagui';

import { Box } from './Box';
import { Text } from './text';

export const BaseButton = styled(Box, {
  name: 'ButtonFrame',

  variants: {
    // style for disabled button
    disabled: {
      true: {
        opacity: 0.5,
      },
    },

    size: {
      small: {
        py: '$1.5',
        px: '$2',
      },
      medium: {
        py: '$3',
        px: '$2',
      },
      large: {
        py: '$4',
        px: '$2.5',
      },
    },

    variant: {
      contained: {
        bg: '$textPrimary',

        pressStyle: {
          bg: '$textSecondary',
        },
      },
      outlined: {
        boc: '$textPrimary',
        bg: '$transparent',

        pressStyle: {
          bg: '#ffffff05',
        },
      },
      text: {
        bg: '$transparent',
        boc: '$transparent',

        pressStyle: {
          bg: '$transparent',
          opacity: 0.5,
        },
      },
    },
  },

  defaultVariants: {
    variant: 'contained',
    size: 'medium',
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
      outlined: {
        color: '$textPrimary',
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
  loading?: boolean;
  textProps?: TextProps;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Button = ({
  children,
  textProps,
  loading,
  startAdornment,
  endAdornment,
  variant = 'contained',
  ...props
}: ButtonProps) => {
  return (
    <BaseButton
      variant={variant}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      {...props}>
      {loading ? (
        <Spinner size="small" />
      ) : (
        <ButtonText buttonVariant={variant} {...textProps}>
          {children}
        </ButtonText>
      )}
    </BaseButton>
  );
};
