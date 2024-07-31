import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';
import { ProfileActivityListEmpty } from '@/components/profile/profile-home/profile-activity-list-empty';
import { ProfileHero } from '@/components/profile/profile-home/profile-hero';
import { ProfileSettings } from '@/components/profile/profile-home/profile-settings';

const Profile = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const handlePress = () => {};

  const handlePressAvatar = () => {};

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => <ProfileSettings />,
      });
    }, [])
  );

  return (
    <Stack px="$2" gap="$4" f={1}>
      <ActivityList
        filters={{
          userId: +params.id,
        }}
        onPress={handlePress}
        onPressAvatar={handlePressAvatar}
        header={<ProfileHero userId={+params.id} />}
        ListEmptyComponent={<ProfileActivityListEmpty userId={+params.id} />}
      />
    </Stack>
  );
};

export default Profile;
