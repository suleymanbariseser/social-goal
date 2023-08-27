import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailVerificationInput,
  emailVerificationSchema,
} from '@social-goal/server/src/routes/auth/schema';
import { useToastController } from '@tamagui/toast';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Stack, YStack } from 'tamagui';
import { useStore } from 'zustand';

import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';
import { authStore } from '@/store/auth';

export default function EmailVerification() {
  const toast = useToastController();

  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { updateEmailToken } = useStore(authStore);
  const { mutate, isLoading, error } = trpc.auth.verify.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationInput>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data: EmailVerificationInput) => {
    await mutate(data, {
      onSuccess: (data) => {
        updateEmailToken(data.token);
        router.push('/register/password');
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
        <Text variant="headline2">Verify Email</Text>
        <Stack>
          <Text variant="subtitle1">To continue using app, you must verify your email</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$4">
        <ControlledInput
          control={control}
          name="email"
          disabled
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <ControlledInput
          control={control}
          name="code"
          placeholder="Verification code"
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        {error && (
          <Text variant="body3" color="$errorMain">
            {error?.message}
          </Text>
        )}
      </YStack>
      <YStack ai="center" gap="$2">
        <Button
          onPress={handleSubmit(onSubmit)}
          w="100%"
          loading={isLoading}
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
