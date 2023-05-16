import { AntDesign } from '@expo/vector-icons';
import Box from './ui/box';
import IconButton from './ui/icon-button';
import Text from './ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import { useRouter } from 'expo-router';

interface Props {
  back?: boolean;
  title: string;
}

export default function Header({ back, title }: Props) {
  const safeArea = useSafeAreaInsets();
  const theme = useTheme();

  const router = useRouter();

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: safeArea.top / 4,
        flexDirection: 'row',
        rowGap: 2,
        paddingHorizontal: 4,
      }}
    >
      {back && (
        <IconButton onPress={() => router.back()}>
          <AntDesign
            name='arrowleft'
            size={24}
            color={theme.palette.text.primary}
          />
        </IconButton>
      )}
      <Box
        sx={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Text>{title}</Text>
      </Box>
    </Box>
  );
}
