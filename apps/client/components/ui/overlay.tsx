import { SlideInRight } from 'react-native-reanimated';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackProps } from 'tamagui';

import { AnimatedStack } from './animated-layout';

type Props = {
  children: React.ReactNode;
  edges?: Edge[];
  open: boolean;
} & StackProps;

export const Overlay = ({ children, edges = [], open, ...props }: Props) => {
  const insets = useSafeAreaInsets();

  if (!open) return null;

  return (
    <AnimatedStack
      entering={SlideInRight}
      l={0}
      t={0}
      r={0}
      b={0}
      pos="absolute"
      zi={99}
      pl={edges.includes('left') && insets.left}
      pt={edges.includes('top') && insets.top}
      pr={edges.includes('right') && insets.right}
      pb={edges.includes('bottom') && insets.bottom}
      {...props}>
      {children}
    </AnimatedStack>
  );
};
