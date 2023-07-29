import { XStack } from 'tamagui';

import { IconButton } from '../ui/icon-button';

import ImageIcon from '@/assets/icons/image.svg';
import LinkIcon from '@/assets/icons/link.svg';

export default function CreateTools() {
  return (
    <XStack gap="$3">
      <IconButton icon={ImageIcon} variant="text" />
      <IconButton icon={LinkIcon} variant="text" />
    </XStack>
  );
}
