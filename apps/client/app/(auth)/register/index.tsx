import { RegisterUserInput, registerUserSchema } from '@app/server/src/routes/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Stack, YStack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form/input';
import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

export default function Register() {
  const toast = useToastController();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
  });
  const { mutate, isLoading } = trpc.auth.register.useMutation();
  const router = useRouter();

  const onSubmit = (data: RegisterUserInput) => {
    mutate(data, {
      onSuccess: () =>
        router.push({
          pathname: '/register/email-verification',
          params: {
            email: data.email,
          },
        }),
      onError: (err) => {
        toast.show(err.message, {
          variant: 'error',
        });
      },
    });
  };

  return (
    <YStack f={1} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Register</Text>
        <Stack maxWidth={220}>
          <Text variant="subtitle1">Be part of our network and plan your future</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$6">
        <Input
          control={control}
          name="firstName"
          placeholder="First name"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <Input
          control={control}
          name="lastName"
          placeholder="Last name"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <Input
          control={control}
          name="email"
          placeholder="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </YStack>
      <YStack ai="center" gap="$2">
        <Button onPress={handleSubmit(onSubmit)} w="100%" loading={isLoading} disabled={isLoading}>
          Continue
        </Button>
        <Text>
          Already have an account? <Text color="$primaryMain">Login</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
