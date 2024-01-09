import { Stack } from 'tamagui';

import { AssetList } from './asset-list/asset-list';

import { Text } from '@/components/ui/text';

export type ActivityCardContentProps = {
  content: string;
  assets: { uri: string }[];
};

export const ActivityCardContent = ({ content, assets }: ActivityCardContentProps) => {
  return (
    <Stack gap="$3">
      <Text variant="body1">{content}</Text>
      {assets.length > 0 && <AssetList assets={assets.map((a) => a.uri)} />}
    </Stack>
  );
};
