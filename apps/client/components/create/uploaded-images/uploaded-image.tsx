import { AlertCircle, X } from '@tamagui/lucide-icons';
import Color from 'color';
import { Image, Spinner, Stack, getTokens } from 'tamagui';

import { IconButton } from '@/components/ui/icon-button';

type Props = {
  uri: string;
  loading: boolean;
  failed: boolean;
  onRemove: () => void;
};

export const UploadedImage = ({ uri, loading, failed, onRemove }: Props) => {
  const getBoc = () => {
    return failed ? '$errorMain' : '$transparent';
  };

  const getBg = () => {
    if (failed) return Color(getTokens().color.$errorMain.val).alpha(0.5).toString();
    return Color(getTokens().color.$textSecondary.val).alpha(0.3).toString();
  };

  return (
    <Stack pos="relative" br="$6" w={100} h={100} ov="hidden" bw={2} boc={getBoc()} bs="solid">
      <Stack pos="absolute" zi={6} r={0} t={0}>
        <IconButton onPress={onRemove} variant="text" icon={() => <X size="$4" />} />
      </Stack>
      <Stack
        pos="absolute"
        l={0}
        t={0}
        w="100%"
        h="100%"
        zi={5}
        ai="center"
        jc="center"
        bg={getBg()}>
        {loading && <Spinner color="$textPrimary" />}
        {failed && <AlertCircle />}
      </Stack>
      <Image source={{ uri }} w={100} h={100} />
    </Stack>
  );
};
