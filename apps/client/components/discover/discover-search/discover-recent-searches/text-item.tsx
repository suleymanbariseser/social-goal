import type { RecentSearchItem } from '@app/server/src/routes/discover/controller';
import { X } from '@tamagui/lucide-icons';
import { Stack, XStack } from 'tamagui';

import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';

type Props = RecentSearchItem;

export const TextItem = ({ text }: Props) => (
  <XStack onPress={console.log} ai="center">
    <Stack fg={1}>
      <Text>{text}</Text>
    </Stack>
    <IconButton variant="text" icon={X} onPress={console.log} />
  </XStack>
);
