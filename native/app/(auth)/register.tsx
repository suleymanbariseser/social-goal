import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Register() {
  const safeArea = useSafeAreaInsets();

  return (
    <Box
      sx={{
        flex: 1,
        paddingTop: 4,
        paddingHorizontal: 6,
        paddingBottom: safeArea.bottom / 4,
      }}
    >
      <Box sx={{ rowGap: 2 }}>
        <Text variant='headline1'>Register</Text>
        <Box sx={{ maxWidth: 220 }}>
          <Text variant='subtitle1'>
            Be part of our network and plan your future
          </Text>
        </Box>
      </Box>
      <Box sx={{ flex: 1, rowGap: 4, paddingVertical: 4 }}>
        <Input placeholder='First name' />
        <Input placeholder='Last name' />
        <Input placeholder='Email' />
      </Box>
      <Box sx={{ alignItems: 'center', rowGap: 2 }}>
        <Button sx={{ width: '100%' }}>Continue</Button>
        <Text>
          Already have an account?{' '}
          <Text color='primary.main' sx={{}}>
            Login
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
