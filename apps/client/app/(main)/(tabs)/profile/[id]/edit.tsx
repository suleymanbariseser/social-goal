import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { Stack } from 'tamagui';

import { ProfileEditForm } from '@/components/profile/profile-edit/profile-edit-form';

export default function ProfileEdit() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Edit',
      });
    }, [])
  );

  return (
    <Stack px="$2" gap="$4" f={1}>
      <ProfileEditForm />
    </Stack>
  );
}
