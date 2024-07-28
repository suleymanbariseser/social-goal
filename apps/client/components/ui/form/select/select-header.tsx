import { Stack } from 'tamagui';

import { Divider } from '../../divider';

type Props = {
  children?: React.ReactNode;
};

export const SelectHeader = ({ children }: Props) => {
  return (
    <Stack px="$6" pb="$4" gap="$4">
      <Stack fd="row" jc="space-between">
        {children}
      </Stack>
      <Divider />
    </Stack>
  );
};
