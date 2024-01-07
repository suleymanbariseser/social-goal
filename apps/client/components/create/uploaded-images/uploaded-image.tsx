import { Image, Stack } from 'tamagui';

import ProfileIcon from '@/assets/icons/profile.svg';
import { IconButton } from '@/components/ui/icon-button';

type Props = {
  uri: string;
};

export const UploadedImage = ({ uri }: Props) => {
  return (
    <Stack w="100%" pos="relative">
      <Stack
        fd="row"
        gap="$2"
        w="100%"
        h="100%"
        ai="center"
        jc="center"
        pos="absolute"
        zi={5}
        l={0}
        t={0}>
        <IconButton icon={() => <ProfileIcon />} />
        <IconButton icon={() => <ProfileIcon />} />
      </Stack>
      <Image source={{ uri }} w="100%" h={200} />
    </Stack>
  );
};
