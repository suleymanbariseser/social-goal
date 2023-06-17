import type { ColorTokens } from 'tamagui';
import { StackProps } from 'tamagui';

import { BaseButton } from './button';

interface Props extends StackProps {
  icon: ({ color }: { color: ColorTokens }) => React.ReactNode;
}

export default function IconButton({ children, icon, ...props }: Props) {
  return (
    <BaseButton
      px="$0"
      py="$0"
      w={40}
      h={40}
      ai="center"
      jc="center"
      bg="#ffffff10"
      pressStyle={{
        bg: '#ffffff20',
      }}
      {...props}>
      {icon({ color: '$textPrimary' })}
    </BaseButton>
  );
}
