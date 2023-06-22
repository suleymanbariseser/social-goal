import { zodResolver } from '@hookform/resolvers/zod';
import {
  CompleteRegisterInput,
  completeRegisterSchema,
} from '@social-goal/server/src/routes/auth/schema';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRegisterStore } from 'store/auth';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/input';
import Text from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

export default function Password() {
  const safeArea = useSafeAreaInsets();
  const { token } = useRegisterStore();
  const { mutate, isLoading, error } = trpc.auth.completeRegister.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteRegisterInput>({
    resolver: zodResolver(completeRegisterSchema),
    defaultValues: {
      token,
    },
  });

  const onSubmit = async (data: CompleteRegisterInput) => {
    await mutate(data, { onSuccess: (data) => console.log(data) });
  };

  return (
    <YStack f={1} pb={safeArea.bottom} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Enter Password</Text>
        <Stack>
          <Text variant="subtitle1">Create a password that you are going to use to login app</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$4">
        <ControlledInput
          control={control}
          name="password"
          placeholder="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          secureTextEntry
        />
        <ControlledInput
          control={control}
          name="rePassword"
          placeholder="Confirm password"
          error={!!errors.rePassword}
          helperText={errors.rePassword?.message}
          secureTextEntry
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
          disabled={isLoading}
          isLoading={isLoading}>
          Register
        </Button>
        <Text>
          Already have an account? <Text color="$primaryMain">Login</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
