import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';
import { ProfileHero } from '@/components/profile/profile-hero';

const Profile = () => {
  const params = useLocalSearchParams<{ id: string }>();

  const handlePress = () => {};

  const handlePressAvatar = () => {};

  return (
    <Stack px="$2" gap="$4" f={1}>
      <ActivityList
        filters={{
          userId: +params.id,
        }}
        onPress={handlePress}
        onPressAvatar={handlePressAvatar}
        header={<ProfileHero userId={+params.id} />}
      />
    </Stack>
  );
};

export default Profile;
