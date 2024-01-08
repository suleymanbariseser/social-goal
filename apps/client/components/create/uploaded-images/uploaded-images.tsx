import { Stack } from 'tamagui';

import { UploadedImage } from './uploaded-image';

import type { Asset } from '@/hooks/use-image-picker';

type Props = {
  assets: Asset[];
  onRemove: (id: string) => void;
};

export const UploadedImages = ({ assets, onRemove }: Props) => {
  if (assets.length === 0) return null;

  return (
    <Stack fd="row" gap="$4" ai="center">
      {assets.map((asset) => (
        <UploadedImage
          key={asset.id}
          uri={asset.uri}
          loading={asset.loading}
          failed={asset.failed}
          onRemove={() => onRemove(asset.id)}
        />
      ))}
    </Stack>
  );
};
