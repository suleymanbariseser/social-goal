import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Stack, XStack } from 'tamagui';

import { ProfileAvatarForm } from './profile-avatar-form';

import { Input } from '@/components/ui/form/input';
import { trpc } from '@/lib/trpc';

export const ProfileEditForm = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [profile] = trpc.user.profile.useSuspenseQuery({ id: +params.id });

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      description: profile?.description,
    },
  });

  return (
    <Stack gap="$4">
      <Stack w="100%" ai="center">
        <ProfileAvatarForm src={profile.image} />
      </Stack>
      <XStack gap="$2">
        <Stack f={1}>
          <Input
            control={control}
            name="firstName"
            placeholder="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Stack>
        <Stack f={1}>
          <Input
            control={control}
            name="lastName"
            placeholder="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Stack>
      </XStack>
      <Input
        control={control}
        name="description"
        placeholder="Description"
        rows={5}
        multiline
        mih="$15"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </Stack>
  );
};
