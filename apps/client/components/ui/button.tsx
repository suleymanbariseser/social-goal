import { Spinner, Stack, StackProps, TextProps, styled } from 'tamagui';

import Text from './text';

export const BaseButton = styled(Stack, {
  name: 'ButtonFrame',

  backgroundColor: '$textPrimary',
  borderRadius: '$12',

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

const Button = ({
  children,
  textProps,
  isLoading,
  ...props
}: StackProps & {
  isLoading?: boolean;
  textProps?: TextProps;
}) => {
  return (
    <BaseButton {...props}>
      {isLoading ? <Spinner size="small" /> : <ButtonText {...textProps}>{children}</ButtonText>}
    </BaseButton>
  );
};

export default Button;
