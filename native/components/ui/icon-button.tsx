import { StackProps } from 'tamagui';

import { BaseButton } from './button';

interface Props extends StackProps {
  children?: React.ReactNode;
}

export default function IconButton({ children, ...props }: Props) {
  return (
    <BaseButton px="$0" py="$0" width="$8" height="$8" {...props}>
      {children}
    </BaseButton>
  );
}
