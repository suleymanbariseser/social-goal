import { Control, Path, useController } from 'react-hook-form';
import { XStack, YStack } from 'tamagui';

import { UploadedImages } from './uploaded-images/uploaded-images';
import { IconButton } from '../ui/icon-button';

import ImageIcon from '@/assets/icons/image.svg';
import LinkIcon from '@/assets/icons/link.svg';
import { useUploadImage } from '@/hooks/asset/use-upload-image';
import { useImagePicker } from '@/hooks/use-image-picker';

type Props<T, Context = any> = {
  name: Path<T>;
  control: Control<T, Context>;
};
export const CreateTools = <T, Context>({ name, control }: Props<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: undefined,
  });

  const { uploadImage } = useUploadImage();
  const { assets, pickImage, removeAsset } = useImagePicker({
    uploader: (base64) => uploadImage({ data: base64, category: 'activity' }),
  });

  return (
    <YStack gap="$2">
      <XStack gap="$3">
        <IconButton icon={ImageIcon} variant="text" onPress={pickImage} />
        <IconButton icon={LinkIcon} variant="text" />
      </XStack>
      <UploadedImages assets={assets} onRemove={removeAsset} />
    </YStack>
  );
};
