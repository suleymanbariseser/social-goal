import { X } from '@tamagui/lucide-icons';
import { Image, Spinner, Stack } from 'tamagui';

import { IconButton } from '@/components/ui/icon-button';

type Props = {
  uri: string;
  loading: boolean;
};

export const UploadedImage = ({ uri, loading }: Props) => {
  return (
    <Stack pos="relative" br="$6" w={100} h={100} ov="hidden">
      <Stack pos="absolute" zi={5} r={0} t={0}>
        <IconButton variant="text" icon={() => <X size="$4" />} />
      </Stack>
      {loading && (
        <Stack pos="absolute" l={0} t={0} w="100%" h="100%" zi={6} ai="center" jc="center">
          <Spinner />
        </Stack>
      )}
      <Image source={{ uri }} w={100} h={100} />
    </Stack>
  );
};
