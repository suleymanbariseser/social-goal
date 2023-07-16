import type { ColorTokens } from 'tamagui';
import { styled } from 'tamagui';

import { BaseButton } from './button';

const IconBaseButton = styled(BaseButton, {
  variants: {
    variant: {
      contained: {
        bg: '#ffffff10',
      },
      text: {
        bg: '$backgroundTransparent',
      },
    },
  },

  pressStyle: {
    opacity: 0.7,
  },
});

interface Props extends React.ComponentProps<typeof IconBaseButton> {
  icon: ({ color }: { color: ColorTokens }) => React.ReactNode;
}

export default function IconButton({ icon, variant = 'contained', ...props }: Props) {
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
      {icon({ color: '$textPrimary' })}
    </IconBaseButton>
  );
}
