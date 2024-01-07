import { Stack } from 'tamagui';

import { UploadedImage } from './uploaded-image';

import type { Asset } from '@/hooks/use-image-picker';

type Props = {
  assets: Asset[];
};

export const UploadedImages = ({ assets }: Props) => {
  if (assets.length === 0) return null;

  return (
    <Stack fd="row" gap="$2" ai="center">
      {assets.map((asset) => (
        <UploadedImage key={asset.id} uri={asset.uri} loading={asset.loading} />
      ))}
    </Stack>
  );
};
