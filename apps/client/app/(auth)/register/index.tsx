import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserInput, registerUserSchema } from '@social-goal/server/src/schemas/auth';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/input';
import Text from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

export default function Register() {
  const safeArea = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
  });
  const { mutate, isLoading } = trpc.auth.register.useMutation();

  const onSubmit = async (data: RegisterUserInput) => {
    await mutate(data);
  };

  return (
    <YStack f={1} pb={safeArea.bottom} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Register</Text>
        <Stack maxWidth={220}>
          <Text variant="subtitle1">Be part of our network and plan your future</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$6">
        <ControlledInput
          control={control}
          name="firstName"
          placeholder="First name"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <ControlledInput
          control={control}
          name="lastName"
          placeholder="Last name"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <ControlledInput
          control={control}
          name="email"
          placeholder="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </YStack>
      <YStack ai="center" gap="$2">
        <Button
          onPress={handleSubmit(onSubmit)}
          w="100%"
          isLoading={isLoading}
          disabled={isLoading}>
          Continue
        </Button>
        <Text>
          Already have an account? <Text color="$primaryMain">Login</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
