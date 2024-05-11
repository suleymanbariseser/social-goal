import { forwardRef } from 'react';
import { Stack, StackProps, TamaguiElement } from 'tamagui';

type Props = {
  children?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
} & StackProps;

const Adornment = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack space="$2" alignItems="center" justifyContent="center">
      {children}
    </Stack>
  );
};

export const Box = forwardRef<TamaguiElement, Props>(
  ({ children, endAdornment, startAdornment, ...rest }, ref) => {
    return (
      <Stack
        ref={ref}
        fd="row"
        ai="center"
        jc="center"
        br="$6"
        gap="$2"
        boc="$transparent"
        bw={1}
        bs="solid"
        {...rest}>
        <Adornment>{startAdornment}</Adornment>
        {children}
        <Adornment>{endAdornment}</Adornment>
      </Stack>
    );
  }
);
