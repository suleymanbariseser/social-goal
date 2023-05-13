import Text from '@/components/ui/Text';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import Input from '@/components/ui/input';

const Auth = () => {
  return (
    <Box
      sx={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 8,
        rowGap: 8,
      }}
    >
      <Text variant='headline1'>Let’s plan and communicate</Text>
      <Box sx={{ rowGap: 4 }}>
        <Button>Continue with Google</Button>
        <Button>Continue with Facebook</Button>
        <Divider content={<Text variant='subtitle2'>OR</Text>} />
        <Input placeholder='Email' />
        <Button>Next</Button>
      </Box>
    </Box>
  );
};

export default Auth;
