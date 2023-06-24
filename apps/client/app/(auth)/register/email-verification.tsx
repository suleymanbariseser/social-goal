import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailVerificationInput,
  emailVerificationSchema,
} from '@social-goal/server/src/routes/auth/schema';
import { useRouter, useSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useRegisterStore } from 'store/auth';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/input';
import Text from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

export default function EmailVerification() {
  const router = useRouter();
  const { email } = useSearchParams<{ email: string }>();
  const { updateToken } = useRegisterStore();
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
        updateToken(data.token);
        router.push('/register/password');
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
