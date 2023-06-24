import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@social-goal/server/src/routes/auth/schema';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { authTokenState } from 'store/auth';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/input';
import Text from '@/components/ui/text';
import { useSetStorageItem } from '@/lib/storage';
import { trpc } from '@/lib/trpc';

export default function Login() {
  const { mutate: login, error } = trpc.auth.login.useMutation();
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
        <ControlledInput
          control={control}
          name="email"
          placeholder="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <ControlledInput
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
        {error && (
          <Text variant="body3" color="$errorMain">
            {error?.message}
          </Text>
        )}
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
