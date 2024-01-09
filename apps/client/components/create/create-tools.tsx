import { useEffect } from 'react';
import { Control, Path, useController } from 'react-hook-form';
import { XStack, YStack } from 'tamagui';

import { UploadedImages } from './uploaded-images/uploaded-images';
import { IconButton } from '../ui/icon-button';
import { Text } from '../ui/text';

import ImageIcon from '@/assets/icons/image.svg';
import LinkIcon from '@/assets/icons/link.svg';
import { useUploadImage } from '@/hooks/asset/use-upload-image';
import { useImagePicker } from '@/hooks/use-image-picker';

type Props<T, Context = any> = {
  name: Path<T>;
  control: Control<T, Context>;
  error?: boolean;
  helperText?: string;
};

export const CreateTools = <T, Context>({
  name,
  control,
  error,
  helperText,
}: Props<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: null,
  });

  const { uploadImage } = useUploadImage();
  const { assets, pickImage, removeAsset } = useImagePicker({
    uploader: (base64) => uploadImage({ data: base64, category: 'activity' }),
  });

  useEffect(() => {
    field.onChange(assets);
  }, [assets]);

  return (
    <YStack gap="$2">
      <XStack gap="$3">
        <IconButton icon={ImageIcon} variant="text" onPress={pickImage} />
        <IconButton icon={LinkIcon} variant="text" />
      </XStack>
      <UploadedImages assets={assets} onRemove={removeAsset} />
      {helperText && (
        <Text variant="body3" col={error ? '$errorMain' : '$textPrimary'}>
          {helperText}
        </Text>
      )}
    </YStack>
  );
};
