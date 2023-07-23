import { Sheet } from 'tamagui';

import { IconButton } from '../ui/icon-button';

import ImageIcon from '@/assets/icons/image.svg';
import LinkIcon from '@/assets/icons/link.svg';

export default function CreateTools() {
  return (
    <Sheet snapPoints={[10]} open modal disableDrag>
      <Sheet.Frame p="$6" fd="row" gap="$3">
        <IconButton icon={ImageIcon} variant="text" />
        <IconButton icon={LinkIcon} variant="text" />
      </Sheet.Frame>
    </Sheet>
  );
}
