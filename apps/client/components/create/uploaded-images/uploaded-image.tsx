import { Image, Spinner, Stack } from 'tamagui';

import ProfileIcon from '@/assets/icons/profile.svg';
import { IconButton } from '@/components/ui/icon-button';

type Props = {
  uri: string;
  loading: boolean;
};

export const UploadedImage = ({ uri, loading }: Props) => {
  return (
    <Stack pos="relative" r="$5" w={100} h={100} ov="hidden">
      <Stack pos="absolute" zi={5} r={5} t={5}>
        <IconButton icon={() => <ProfileIcon />} />
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
