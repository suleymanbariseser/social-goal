import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
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
        <Text variant='headline1'>Welcome Back!</Text>
        <Box sx={{ maxWidth: 220 }}>
          <Text variant='subtitle1'>You’ve been missed</Text>
        </Box>
      </Box>
      <Box sx={{ flex: 1, rowGap: 4, paddingVertical: 4 }}>
        <Input placeholder='Email' />
        <Input placeholder='Password' />
        <Link href='/forgot-password'>
          <Text color='primary.main'>Forgot password?</Text>
        </Link>
      </Box>
      <Box sx={{ alignItems: 'center', rowGap: 2 }}>
        <Button sx={{ width: '100%' }}>Login</Button>
        <Text>
          Do not have an account? <Text color='primary.main'>Sign up</Text>
        </Text>
      </Box>
    </Box>
  );
}
