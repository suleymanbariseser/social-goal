import { LoginInput, loginSchema } from '@app/server/src/routes/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastController } from '@tamagui/toast';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Stack, YStack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form/input';
import { Text } from '@/components/ui/text';
import { useSetStorageItem } from '@/lib/storage';
import { trpc } from '@/lib/trpc';
import { authTokenState } from '@/store/auth';

export default function Login() {
  const toast = useToastController();
  const router = useRouter();

  const { mutate: login } = trpc.auth.login.useMutation();
  const setAuthToken = useSetStorageItem(authTokenState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data, {
      onSuccess: ({ token }) => {
        setAuthToken(token);
        router.push('/(main)/');
      },
      onError: (error) => {
        toast.show(error.message, {
          variant: 'error',
        });
      },
    });
  };

  return (
    <YStack f={1} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Welcome Back!</Text>
        <Stack maxWidth={220}>
          <Text variant="subtitle1">You’ve been missed</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$4">
        <Input
          control={control}
          name="email"
          placeholder="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Input
          control={control}
          name="password"
          placeholder="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          secureTextEntry
        />
        <Link href="/forgot-password">
          <Text color="$primaryMain">Forgot password?</Text>
        </Link>
      </YStack>
      <YStack ai="center" gap="$2">
        <Button onPress={handleSubmit(onSubmit)} w="100%">
          Login
        </Button>
        <Text>
          Do not have an account?{' '}
          <Link href="/register">
            <Text color="$primaryMain">Sign up</Text>
          </Link>
        </Text>
      </YStack>
    </YStack>
  );
}
