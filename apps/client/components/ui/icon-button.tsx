import type { ColorTokens, SizeTokens } from 'tamagui';
import { styled } from 'tamagui';

import { BaseButton } from './button';

export const IconBaseButton = styled(BaseButton, {
  variants: {
    variant: {
      contained: {
        bg: '#ffffff10',
      },
      text: {
        bg: '$transparent',
      },
    },
  },

  pressStyle: {
    opacity: 0.7,
  },
});

interface Props extends React.ComponentProps<typeof IconBaseButton> {
  icon: React.ComponentType<{ color: ColorTokens; size?: SizeTokens }>;
}

export function IconButton({ icon: Icon, variant = 'contained', ...props }: Props) {
  return (
    <IconBaseButton
      px="$0"
      py="$0"
      w={40}
      h={40}
      ai="center"
      jc="center"
      br="$12"
      variant={variant}
      {...props}>
      <Icon color="$textPrimary" size="$6" />
    </IconBaseButton>
  );
}
